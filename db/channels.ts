import { createServerClient } from '@/supabase';
import { cookies } from 'next/headers';

export async function getChannelById(channelId: string) {
  const supabase = createServerClient(cookies());

  const { data: channel, error } = await supabase
    .from('channels')
    .select(`* , messages(*, user:profiles!inner(id, avatar_url, name))`)
    .eq('id', channelId)
    .single();
  // .rpc('get_channel_with_messages', { target_channel_id: +channelId })
  // .single();

  if (error) {
    console.log(error);
    throw new Error('Could not fetch channel messages');
  }

  channel.messages.sort(
    (a, b) =>
      new Date(a.created_at as string).getTime() -
      new Date(b.created_at as string).getTime()
  );

  return channel as ChannelWithMessages;
}
