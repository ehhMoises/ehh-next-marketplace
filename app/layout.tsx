import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Providers } from './provider';

const openSans = Open_Sans({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Marketplace - eHarvestHub',
  description: 'Marketplace',
  icons: [
    {
      href: '/favicon-32x32.png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      href: '/favicon-192x192.png',
      sizes: '192x192',
      url: '/favicon-192x192.png',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={openSans.className}>{children}</body>
      </Providers>
    </html>
  );
}
