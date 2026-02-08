"use client";

import { useState } from 'react';
import { CampaignCard } from '@/components/campaign/campaign-card';
import type { Campaign } from '@/models/campaign';
import { campaigns } from '@/data/campaigns';

import { HeroSection } from './hero-section';
import { CategoryNavigation } from './category-navigation';
import { CallToAction } from './call-to-action';
import { HowItWorks } from './how-it-works';
import { WhyBenevolus } from './why-benevolus';
import { ImpactSection } from './impact-section';
import { TestimonialsSection } from './testimonials-section';
import { FaqSection } from './faq-section';
import { NewsletterSection } from './newsletter-section';
import { CategoriesSection } from './categories-section';
import { TrustSection } from './trust-section';

const mappedCampaigns: Campaign[] = campaigns.campaigns.map((c) => ({
  slug: c.slug,
  title: c.title,
  category: c.category,
  daysRemaining: c.daysRemaining,
  progress: c.progressPercent,
  currentAmount: Math.round(c.raised * 100), // convert to cents
  goalAmount: Math.round(c.goal * 100),
  image: c.image,
}));

const categories = ['Todos', ...new Set(campaigns.campaigns.map(c => c.category))];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredCampaigns = selectedCategory === 'Todos'
    ? mappedCampaigns
    : mappedCampaigns.filter(c => c.category === selectedCategory);

  return (
    <main className="space-y-16">
      <div className="container max-w-[1280px] mx-auto flex-1 flex flex-col items-center justify-center px-8 my-16 space-y-16">
        <HeroSection />
        <div className="max-w-full">
          <CategoryNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard campaign={campaign} key={campaign.slug} />
          ))}
        </div>
        <HowItWorks />
        <CategoriesSection />
        <WhyBenevolus />
        <ImpactSection />
        <TrustSection />
        <TestimonialsSection />
        <FaqSection />
        <NewsletterSection />
      </div>
      <CallToAction />
    </main>
  );
}
