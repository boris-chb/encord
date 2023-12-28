import ChannelsSidebar from '@/app/components/channels-sidebar';
import { createServerClient } from '@/app/lib/db';

import { cookies } from 'next/headers';

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { serverId } = params;

  const supabase = createServerClient(cookies());

  const { data, error } = await supabase
    .from('categories')
    .select(`*, channels (*), servers(label)`)
    .eq('server_id', serverId);

  if (error) throw new Error('Could not fetch categories');

  return (
    <>
      <ChannelsSidebar className='hidden md:flex' categories={data} />
      {children}
    </>
  );
}
