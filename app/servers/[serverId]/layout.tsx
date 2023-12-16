import ChannelsSidebar from '@/app/components/channels-sidebar';
import { createSupabaseClient } from '@/app/lib/db';

import servers from '@/data.json';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { serverId } = params;

  const supabase = createSupabaseClient(cookies());

  const { data, error } = await supabase
    .from('categories')
    .select(`*, channels (*), servers(label)`)
    .eq('server_id', serverId);

  if (error) throw new Error('Could not fetch categories');

  return (
    <>
      <ChannelsSidebar categories={data} />
      {children}
    </>
  );
}
