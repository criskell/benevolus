'use client';

import { CampaignHeader } from './components/campaign-header';
import { ImageGallery } from './components/image-gallery';
import { CampaignStory } from './components/campaign-story';
import { CampaignUpdates } from './components/campaign-updates';
import { CampaignDonors } from './components/campaign-donors';
import { CampaignComments } from './components/campaign-comments';
import { CampaignSidebar } from './components/campaign-sidebar';

const CampaignPage = () => {
  return (
    <div className="flex-1 my-8 md:my-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Main Content */}
          <main className="w-full lg:flex-1 space-y-6">
            <CampaignHeader />
            <ImageGallery />
            <CampaignStory />
            <CampaignUpdates />
            <CampaignDonors />
            <CampaignComments />
          </main>

          {/* Sidebar - Sticky on desktop */}
          <aside className="w-full lg:w-[380px] xl:w-[420px]">
            <div className="lg:sticky lg:top-24">
              <CampaignSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
