import { createServerClient } from '@/supabase';
import { cookies } from 'next/headers';

export default async function getCategoriesByServerId(serverId: string) {
  const supabase = createServerClient(cookies());
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`*, channels (*), servers(label)`)
    .eq('server_id', +serverId);

  if (error) {
    console.log(error);
    throw new Error('Could not fetch categories');
  }

  return categories;
}
