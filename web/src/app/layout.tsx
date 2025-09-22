import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';

import { cn } from '@/lib/cn';
import { Navbar } from '@/components/layout/navbar';

import './globals.css';
import { Footer } from '@/components/layout/footer';

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
    <html lang="pt-BR">
      <body
        className={cn(
          'antialiased text-foreground bg-background font-sans',
          fontSans.variable
        )}
      >
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
