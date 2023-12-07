'use client';
import * as Icons from '@/app/components/ui/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { classNames } from '../channels-sidebar';

export function ChannelLink({ channel }: any) {
  // @ts-ignore
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  const params = useParams();
  const isActive = +params.channelId === channel.id;

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
    <Link
      key={channel.id}
      href={`/servers/1/channels/${channel.id}`}
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1`}
    >
      {state === 'inactiveUnread' && (
        <div className='absolute -left-2 h-2 w-1 rounded-r-full bg-white'></div>
      )}
      <Icon className='mr-1.5 h-5 w-5 text-gray-400' />
      {channel.label}
      <Icons.AddPerson className='ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100' />
    </Link>
  );
}
