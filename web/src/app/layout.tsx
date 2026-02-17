import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Provider } from 'jotai';

import { cn } from '@/lib/utils/cn';
import { Navbar } from '@/components/layout/navbar';
import { detectLocale } from '@/lib/utils/locale';

import './globals.css';
import { siteConfig } from '@/config/site';
import { Footer } from '@/components/layout/footer';
import { DonationProvider } from '@/contexts/DonationContext';

const fontSans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await detectLocale();
  const langMap: Record<string, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
  };

  return (
    <html lang={langMap[locale] || 'en-US'} suppressHydrationWarning>
      <body
        className={cn(
          'antialiased text-foreground bg-background font-sans flex flex-col min-h-screen',
          fontSans.variable
        )}
      >
        <NextTopLoader color="hsl(var(--heroui-primary))" showSpinner={false} />
        <NextIntlClientProvider>
          <Provider>
            <DonationProvider>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </DonationProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
