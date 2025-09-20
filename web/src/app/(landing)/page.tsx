import { HeroSection } from './hero-section';
import { CategoryNavigation } from './category-navigation';

export default function Home() {
  return (
    <main className="container mx-auto flex-1 flex flex-col items-center justify-center overflow-hidden px-8 my-16 space-y-16">
      <HeroSection />
      <div className="max-w-full">
        <CategoryNavigation />
      </div>
    </main>
  );
}
