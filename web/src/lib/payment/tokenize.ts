interface CardData {
  cardNumber: string;
  holderName: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

interface TokenResult {
  token: string;
  customerId?: string;
}

interface TokenizationSession {
  gateway?: string | null;
  clientSecret?: string | null;
  customerId?: string | null;
}

export async function tokenizeCard(
  session: TokenizationSession,
  card: CardData,
): Promise<TokenResult> {
  switch (session.gateway) {
    case 'stripe':
      return tokenizeWithStripe(session, card);
    case 'asaas':
      return tokenizeWithAsaas(card);
    default:
      throw new Error(`Unsupported gateway: ${session.gateway}`);
  }
}

async function tokenizeWithStripe(
  session: TokenizationSession,
  card: CardData,
): Promise<TokenResult> {
  const { loadStripe } = await import('@stripe/stripe-js');

  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  if (!stripePublicKey) {
    throw new Error('Stripe public key not configured');
  }

  const stripe = await loadStripe(stripePublicKey);
  if (!stripe) {
    throw new Error('Failed to load Stripe.js');
  }

  const { error, setupIntent } = await stripe.confirmCardSetup(
    session.clientSecret!,
    {
      payment_method: {
        card: {
          number: card.cardNumber,
          exp_month: parseInt(card.expMonth),
          exp_year: parseInt(card.expYear),
          cvc: card.cvv,
        } as never, // Stripe.js typically uses Elements; raw card data requires Stripe's card_data API
        billing_details: {
          name: card.holderName,
        },
      },
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return {
    token: setupIntent!.payment_method as string,
    customerId: session.customerId ?? undefined,
  };
}

async function tokenizeWithAsaas(card: CardData): Promise<TokenResult> {
  // Asaas client-side tokenization via their JS SDK
  // The SDK sends card data directly to Asaas servers without touching our backend
  // Reference: https://docs.asaas.com/docs/tokenizacao-de-cartao-de-credito

  const asaasBaseUrl = process.env.NEXT_PUBLIC_ASAAS_BASE_URL ?? 'https://sandbox.asaas.com';

  const script = document.createElement('script');
  script.src = `${asaasBaseUrl}/charger/asaas.js`;
  await new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Asaas.js'));
    document.head.appendChild(script);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const asaas = (window as any).Asaas as {
    creditCard: {
      tokenize: (data: Record<string, unknown>) => Promise<{ creditCardToken: string; creditCardNumber: string }>;
    };
  };

  if (!asaas?.creditCard?.tokenize) {
    throw new Error('Asaas.js SDK not available');
  }

  const result = await asaas.creditCard.tokenize({
    creditCard: {
      holderName: card.holderName,
      number: card.cardNumber,
      expiryMonth: card.expMonth,
      expiryYear: card.expYear,
      ccv: card.cvv,
    },
  });

  return {
    token: result.creditCardToken,
  };
}
