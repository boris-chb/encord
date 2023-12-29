import { Discord } from '@/components/ui/icons';
import NavLink from '@/components/navigation/nav-link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import getServersWithChannels from '@/db/servers';

type ServersSidebarProps = {
  serverId?: any;
} & React.HTMLProps<HTMLDivElement>;

export default async function ServersSidebar({
  className,
}: ServersSidebarProps) {
  const servers = await getServersWithChannels();

  return (
    <nav
      className={twMerge(
        'no-scrollbar flex-col gap-2 overflow-y-auto bg-gray-900 p-3',
        className
      )}
    >
      {/* dashboard link */}
      <NavLink href='/'>
        <Discord className='h-5 w-7' />
      </NavLink>

      <hr className='mx-2 rounded border-t-2 border-t-white/[.06]' />

      {/* servers list */}
      {servers.map(
        ({ server_label, server_id, img, first_channel_id }: any) => (
          <NavLink
            key={server_id}
            href={{
              serverId: server_id,
              channelId: first_channel_id,
            }}
          >
            {/* TODO: images for servers */}
            {false ? (
              <Image
                className='p-px'
                src={`/${img}`}
                priority
                alt='server icon'
              />
            ) : (
              <div className='truncate px-1'>{server_label}</div>
            )}
          </NavLink>
        )
      )}
    </nav>
  );
}
