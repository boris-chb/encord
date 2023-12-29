import ServersSidebar from '@/components/server-sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { cookies } from 'next/headers';
import getServersWithChannels from '@/db/servers';
import MobileSidebar from '@/components/navigation/mobile-sidebar';
import ChannelsSidebar from '@/components/channels-sidebar';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

const ginto = localFont({ src: './fonts/ginto/ginto-semibold.woff' });

const whitney = localFont({
  src: [
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const servers = await getServersWithChannels();

  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${whitney.className} flex h-screen bg-gray-800 text-gray-100`}
      >
        <div className='fixed left-3 top-3'>
          <MobileSidebar>
            <ServersSidebar className='flex' />
            <ChannelsSidebar />
          </MobileSidebar>
        </div>
        <ServersSidebar className='hidden md:flex' />
        {children}
      </body>
    </html>
  );
}
