export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Benevolus',
  description:
    'Una forças e ajude quem mais precisa. Cada gota faz a chuva acontecer.',
  navItems: [
    {
      labelKey: 'navbar.campaigns',
      href: '/campaigns',
    },
    {
      labelKey: 'navbar.mission',
      href: '/mission',
    },
    {
      labelKey: 'navbar.help',
      href: '/help-center',
    },
  ],
  navMenuItems: [] as {
    label: string;
  }[],
};
