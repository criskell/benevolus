export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Benevolus",
  description:
    "Una forças e ajude quem mais precisa. Cada gota faz a chuva acontecer.",
  navItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Campanhas",
      href: "/campaigns",
    },
    {
      label: "Sobre nós",
      href: "/about-us",
    },
    {
      label: "Dúvidas?",
      href: "/faq",
    },
  ],
  navMenuItems: [] as {
    label: string;
  }[],
};
