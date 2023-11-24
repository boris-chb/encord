import ServersSidebar from '@/app/components/server-sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import { SVGProps } from 'react';

const inter = Inter({ subsets: ['latin'] });

const ginto = localFont({ src: './fonts/ginto/ginto-semibold.woff' });

const whitney = localFont({
  src: [
    {
      path: './fonts/whitney/whitney-book.woff',
      weight: '300',
    },
    {
      path: './fonts/whitney/whitney-medium.woff',
      weight: '500',
    },
    {
      path: './fonts/whitney/whitney-semibold.woff',
      weight: '600',
    },
    {
      path: './fonts/whitney/whitney-light.woff',
      weight: '200',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Encord',
  description: 'A Discord clone build using Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${whitney.className} flex h-screen text-gray-100`}
      >
        <ServersSidebar />
        {children}
      </body>
    </html>
  );
}
