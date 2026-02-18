'use client';

import { useState, useMemo, useEffect, useCallback, use } from 'react';
import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/hooks/use-cart';
import { useFavorites } from '@/hooks/use-favorites';
import { useSuggestedCampaigns } from '@/hooks/use-suggested-campaigns';
import { campaigns } from '@/data/campaigns';
import type { Campaign } from '@/models/campaign';
import { calculateDistribution } from './calculate-distribution';
import CampaignHeader from './campaign-header';
import DistributionForm from './distribution-form';
import RelatedCampaigns from './related-campaigns';
import CartSidebar from './cart-sidebar';
import DonationSummaryModal from './donation-summary-modal';

const campaignMap = campaigns.campaigns.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, (typeof campaigns.campaigns)[number]>
);

const DistributePage = ({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const params = use(paramsPromise);
  const campaignSlug = params.slug;
  const t = useTranslations('campaigns.distribute');

  const cart = useCart();
  const { favorites } = useFavorites();
  const { getRelated } = useSuggestedCampaigns();

  const likedSlugs = favorites.map((f) => f.slug);

  const [totalAmount, setTotalAmount] = useState(50);
  const [criteria, setCriteria] = useState<'equal' | 'mixed' | 'integral'>(
    'mixed'
  );
  const [distributionType, setDistributionType] = useState<
    'category' | 'favorites'
  >(likedSlugs.length >= 2 ? 'favorites' : 'category');
  const [showDonationSummary, setShowDonationSummary] = useState(false);

  const campaign = campaigns.campaigns.find((c) => c.slug === campaignSlug);

  const distribution = useMemo(() => {
    if (!campaign) return [];
    return calculateDistribution(campaign, criteria, distributionType, totalAmount, likedSlugs);
  }, [campaign, criteria, distributionType, totalAmount, likedSlugs]);

  const handleAutoDistribute = useCallback(() => {
    cart.clearCart();
    distribution.forEach((item) => {
      const camp = campaignMap[item.slug];
      if (camp) {
        cart.addToCart({
          slug: item.slug,
          title: camp.title,
          image: camp.image,
          amount: item.amount,
        });
      }
    });
  }, [distribution, cart]);

  useEffect(() => {
    handleAutoDistribute();
  }, [criteria, distributionType, totalAmount]);

  if (!campaignSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card
          className="p-8 max-w-md text-center border border-default-200"
          shadow="none"
        >
          <Icon
            icon="solar:danger-triangle-bold"
            width={64}
            className="text-warning mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{t('error_missing_param')}</h2>
          <p className="text-default-600">
            {t('error_missing_param_text')}
          </p>
        </Card>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card
          className="p-8 max-w-md text-center border border-default-200"
          shadow="none"
        >
          <Icon
            icon="solar:box-minimalistic-bold"
            width={64}
            className="text-danger mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{t('error_not_found')}</h2>
          <p className="text-default-600">
            {t('error_not_found_text', { slug: campaignSlug })}
          </p>
        </Card>
      </div>
    );
  }

  if (!campaign.image) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card
          className="p-8 max-w-md text-center border border-default-200"
          shadow="none"
        >
          <Icon
            icon="solar:gallery-bold"
            width={64}
            className="text-default-400 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{t('error_no_image')}</h2>
          <p className="text-default-600">{t('error_no_image_text')}</p>
        </Card>
      </div>
    );
  }

  const relatedCampaigns = getRelated(campaign.category, campaign.slug);

  const handleQuickDonate = (
    relatedCampaign: Campaign,
    quickAmount: number
  ) => {
    cart.addToCart({
      slug: relatedCampaign.slug || '',
      title: relatedCampaign.title,
      image: relatedCampaign.image,
      amount: quickAmount,
    });
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <CampaignHeader campaign={campaign} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <DistributionForm
              campaign={campaign}
              totalAmount={totalAmount}
              onTotalAmountChange={setTotalAmount}
              criteria={criteria}
              onCriteriaChange={setCriteria}
              distributionType={distributionType}
              onDistributionTypeChange={setDistributionType}
              likedSlugs={likedSlugs}
              distribution={distribution}
              campaignMap={campaignMap}
            />

            <RelatedCampaigns
              campaigns={relatedCampaigns}
              onQuickDonate={handleQuickDonate}
            />
          </div>

          <CartSidebar
            cart={cart}
            onCheckout={() => setShowDonationSummary(true)}
          />
        </div>
      </div>

      <DonationSummaryModal
        isOpen={showDonationSummary}
        onClose={() => setShowDonationSummary(false)}
        cartItems={cart.cart}
      />
    </div>
  );
};

export default DistributePage;
