import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';
import NextTopLoader from 'nextjs-toploader';

import { cn } from '@/lib/utils/cn';
import { Navbar } from '@/components/layout/navbar';

import './globals.css';
import { Footer } from '@/components/layout/footer';
import { DonationProvider } from '@/contexts/DonationContext';
import { Provider } from 'jotai';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
}
