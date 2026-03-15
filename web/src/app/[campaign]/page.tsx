import { notFound } from 'next/navigation';
import { getCampaign } from '@/lib/http/generated/getCampaign';
import { CampaignHeader } from './campaign-header';
import { ImageGallery } from './image-gallery';
import { CampaignStory } from './campaign-story';
import { CampaignUpdates } from './campaign-updates';
import { CampaignDonors } from './campaign-donors';
import { CampaignComments } from './campaign-comments';
import { CampaignSidebar } from './campaign-sidebar';

interface PageProps {
  params: Promise<{
    campaign: string;
  }>;
}

const CampaignPage = async ({ params }: PageProps) => {
  const { campaign: slug } = await params;
  const campaign = await getCampaign(slug);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="flex-1 my-8 md:my-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          <main className="w-full lg:flex-1 space-y-6">
            <CampaignHeader campaign={campaign} />
            <ImageGallery images={campaign.image ? [campaign.image] : []} />
            <CampaignStory description={campaign.description ?? ''} />
            <CampaignUpdates updates={campaign.updates ?? []} />
            <CampaignDonors
              donations={campaign.donations ?? []}
              donorsCount={campaign.donationsCount ?? 0}
            />
            <CampaignComments comments={campaign.comments ?? []} />
          </main>

          <aside className="w-full lg:w-[380px] xl:w-[420px]">
            <div className="lg:sticky lg:top-24">
              <CampaignSidebar campaign={campaign} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
