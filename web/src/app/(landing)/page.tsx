'use client';

import { HeroSection } from './hero-section';
import { LiveDonationsCounter } from './live-donations-counter';
import { CampaignsSection } from './campaigns-section';
import { CallToAction } from './call-to-action';
import { HowItWorks } from './how-it-works';
import { WhyBenevolus } from './why-benevolus';
import { ImpactSection } from './impact-section';
import { TestimonialsSection } from './testimonials-section';
import { FaqSection } from './faq-section';
import { NewsletterSection } from './newsletter-section';
import { CategoriesSection } from './categories-section';
import { TrustSection } from './trust-section';

const Home = () => {
  return (
    <main className="space-y-16">
      <div className="container max-w-[1280px] mx-auto flex-1 flex flex-col items-center justify-center px-8 my-16 space-y-16">
        <HeroSection />
        <LiveDonationsCounter />
        <CampaignsSection />
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
};

export default Home;
