import ServersSidebar from '@/app/components/server-sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { createServerClient } from './lib/db';
import { cookies } from 'next/headers';

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
  const supabase = createServerClient(cookies());
  const { data: servers, error } = await supabase.rpc(
    'get_servers_with_channels'
  );

  if (error) throw new Error('Could not fetch servers');

  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${whitney.className} flex h-screen bg-gray-800 text-gray-100`}
      >
        <ServersSidebar servers={servers} className='hidden md:flex' />
        {children}
      </body>
    </html>
  );
}
