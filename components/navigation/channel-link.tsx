'use client';
import * as Icons from '@/components/ui/icons';
import useStore from '@/lib/store';
import { useParams, useRouter } from 'next/navigation';

export function ChannelLink({ channel }: any) {
  // @ts-ignore
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  const { channelId, serverId } = useParams();
  const router = useRouter();
  const isActive = +channelId === channel.id;

  const sheetCloseRef = useStore((state) => state.sheetCloseRef);

  const state = isActive
    ? 'active'
    : channel.unread
      ? 'inactiveUnread'
      : 'inactiveRead';

  const classes = {
    active: 'text-white hover:bg-gray-550/[0.32]',
    inactiveUnread: `text-white hover:bg-gray-550/[0.16] active:opacity-24`,
    inactiveRead: `text-gray-300 hover:bg-gray-550/[0.16] active:opacity-24 hover:text-gray-100`,
  };

  return (
    <button
      key={channel.id}
      onClick={() => {
        router.push(`/servers/${serverId}/channels/${channel.id}`);
        sheetCloseRef.current?.click();
      }}
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1`}
    >
      {state === 'inactiveUnread' && (
        <div className='absolute -left-2 h-2 w-1 rounded-r-full bg-white'></div>
      )}
      <Icon className='mr-1.5 h-5 w-5 text-gray-400' />
      {channel.label}
      <Icons.AddPerson className='ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100' />
    </button>
  );
}
