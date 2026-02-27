import { HelpCenterHero } from './help-center-hero';
import { HelpCenterCategories } from './help-center-categories';
import { HelpCenterPopular } from './help-center-popular';
import { HelpCenterQuickLinks } from './help-center-quick-links';

const HelpCenterPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      <HelpCenterHero />
      <HelpCenterCategories />
      <HelpCenterPopular />
      <HelpCenterQuickLinks />
    </main>
  );
};

export default HelpCenterPage;
