'use client';

import { HeroSection } from './hero-section';

export default function Home() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-8 my-16">
      <HeroSection />
    </main>
  );
}
