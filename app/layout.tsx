import ServersSidebar from '@/app/components/server-sidebar';
import { createServerClient } from '@supabase/ssr';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { createSupabaseClient } from './lib/db';
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
  const supabase = createSupabaseClient(cookies());
  const { data: servers, error } = await supabase.from('servers').select('*');

  if (error) throw new Error('Could not fetch servers');

  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${whitney.className} flex h-screen bg-gray-800 text-gray-100`}
      >
        <ServersSidebar servers={servers} />
        {children}
      </body>
    </html>
  );
}
