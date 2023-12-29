import { createServerClient } from '@/supabase';
import { cookies } from 'next/headers';

export default async function getServersWithChannels() {
  const supabase = createServerClient(cookies());
  const { data: servers, error } = await supabase.rpc(
    'get_servers_with_channels'
  );

  if (error) throw new Error('Could not fetch servers');

  return servers;
}
