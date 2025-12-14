'use client';

import { CampaignHeader } from './components/campaign-header';
import { ImageGallery } from './components/image-gallery';
import { CampaignStory } from './components/campaign-story';
import { CampaignUpdates } from './components/campaign-updates';
import { CampaignDonors } from './components/campaign-donors';
import { CampaignComments } from './components/campaign-comments';
import { CampaignSidebar } from './components/campaign-sidebar';

export default function CampaignPage() {
  return (
    <div className="flex-1 my-16 max-w-[1280px] mx-auto flex gap-16 justify-between relative">
      <main className="w-full space-y-8">
        <CampaignHeader />
        <ImageGallery />
        <CampaignStory />
        <CampaignUpdates />
        <CampaignDonors />
        <CampaignComments />
      </main>

      <CampaignSidebar />
    </div>
  );
}
