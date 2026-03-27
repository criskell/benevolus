'use client';

import { Spinner } from '@heroui/react';
import { HeartIcon } from 'lucide-react';
import { useQueries } from '@tanstack/react-query';
import { ProfileSidebar } from '../profile-sidebar';
import { DonationCard } from './donation-card';
import type { Donation } from './donation-card';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import { listCampaignDonationsQueryOptions } from '@/lib/http/generated/hooks/useListCampaignDonations';

const DonationsPage = () => {
  const { data: profile } = useGetProfile();

  const { data: campaignsResponse, isLoading: isLoadingCampaigns } =
    useListCampaigns(
      { userId: profile?.id },
      { query: { enabled: !!profile?.id } },
    );

  const campaigns = (campaignsResponse?.data ?? []).filter((c) => !!c.slug);

  const donationQueries = useQueries({
    queries: campaigns.map((c) =>
      listCampaignDonationsQueryOptions(c.slug!),
    ),
  });

  const isLoadingDonations = donationQueries.some((q) => q.isLoading);
  const isLoading = isLoadingCampaigns || isLoadingDonations;

  const donations: Donation[] = campaigns.flatMap((campaign, i) => {
    const data = donationQueries[i]?.data?.data ?? [];
    return data.map((d) => ({
      campaignTitle: campaign.title ?? '',
      campaignImage: campaign.image ?? null,
      campaignSlug: campaign.slug ?? '',
      donorName: d.donor_name ?? '',
      amountCents: d.amount_cents ?? 0,
      createdAt: d.created_at ?? '',
    }));
  });

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Minhas Doações</h1>
            <p className="text-sm text-default-500">
              Veja todas suas doações abaixo.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" />
            </div>
          ) : donations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HeartIcon size={48} className="text-default-300 mb-4" />
              <p className="text-lg font-medium text-default-600">
                Você ainda não fez nenhuma doação
              </p>
              <p className="text-sm text-default-400 mt-1">
                Suas doações aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {donations.map((donation, index) => (
                <DonationCard
                  key={`${donation.campaignSlug}-${index}`}
                  donation={donation}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DonationsPage;
