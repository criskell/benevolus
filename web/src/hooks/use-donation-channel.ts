import { useEffect, useRef } from 'react';
import { env } from '@/lib/env';
export function useDonationChannel(
  externalReference: string | null,
  onPaymentConfirmed: () => void,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const echoRef = useRef<any>(null);
  const callbackRef = useRef(onPaymentConfirmed);
  callbackRef.current = onPaymentConfirmed;

  useEffect(() => {
    if (!externalReference) return;

    let cancelled = false;

    const setup = async () => {
      const { default: EchoClass } = await import('laravel-echo');
      const Pusher = (await import('pusher-js')).default;

      if (cancelled) return;

      const echo = new EchoClass({
        broadcaster: 'reverb',
        key: env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: Number(env.NEXT_PUBLIC_REVERB_PORT),
        wssPort: Number(env.NEXT_PUBLIC_REVERB_PORT),
        forceTLS: env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
        enabledTransports: ['ws', 'wss'],
        Pusher,
      });

      echoRef.current = echo;

      echo
        .channel(`donation.paid.${externalReference}`)
        .listen('.donation.paid', () => {
          callbackRef.current();
        });
    };

    setup();

    return () => {
      cancelled = true;
      if (echoRef.current) {
        echoRef.current.leave(`donation.paid.${externalReference}`);
        echoRef.current.disconnect();
        echoRef.current = null;
      }
    };
  }, [externalReference]);
}
