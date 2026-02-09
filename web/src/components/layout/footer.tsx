'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { link: "#", icon: "mdi:facebook", label: "Facebook" },
  { link: "#", icon: "mdi:instagram", label: "Instagram" },
  { link: "#", icon: "mdi:twitter", label: "Twitter" },
  { link: "#", icon: "mdi:linkedin", label: "LinkedIn" },
];

export const Footer = () => {
  const t = useTranslations('footer');
  return (
    <footer className="relative border-t border-default-200 bg-gradient-to-b from-default-50 to-default-100/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Seção principal */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Coluna da marca/logo */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold text-foreground tracking-tight">
                  Benevolus
                </span>
              </Link>
              <p className="text-default-600 leading-relaxed mb-6 max-w-sm">
                {t('brand_description')}
              </p>
              {/* Ícones sociais */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    aria-label={social.label}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-default-100 hover:bg-primary hover:text-white text-default-600 transition-all duration-300 hover:scale-110"
                  >
                    <Icon icon={social.icon} width={20} height={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Colunas de links */}
            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                  {t('about_title')}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/mission"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('about_who_we_are')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/help-center"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('about_how_it_works')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/terms"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('about_terms_of_use')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/changelog"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('about_changelog')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                  {t('support_title')}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/help-center"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('support_help_center')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('support_contact')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/faq"
                      className="text-default-600 hover:text-primary transition-colors duration-200"
                    >
                      {t('support_faq')}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                  {t('campaigns_title')}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/campaigns" className="text-default-600 hover:text-primary transition-colors duration-200">
                      {t('campaigns_view_all')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaigns/create" className="text-default-600 hover:text-primary transition-colors duration-200">
                      {t('campaigns_create')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/leaderboard" className="text-default-600 hover:text-primary transition-colors duration-200">
                      {t('campaigns_leaderboard')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-default-600 hover:text-primary transition-colors duration-200">
                      {t('campaigns_blog')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-default-200 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-default-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {t('copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-default-500 hover:text-foreground transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="text-default-500 hover:text-foreground transition-colors">
                {t('terms')}
              </Link>
              <Link href="/contact" className="text-default-500 hover:text-foreground transition-colors">
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
