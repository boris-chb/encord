import { Discord } from '@/app/components/ui/icons';
import NavLink from '@/app/components/navigation/nav-link';
import Image from 'next/image';

export default function ServersSidebar({ servers }: any) {
  return (
    <nav className='flex flex-col gap-2 overflow-y-auto bg-gray-900 p-3'>
      {/* dashboard link */}
      <NavLink href='/'>
        <Discord className='h-5 w-7' />
      </NavLink>

      <hr className='mx-2 rounded border-t-2 border-t-white/[.06]' />

      {/* servers list */}
      {servers.map(({ label, id, img }: any) => (
        <NavLink key={id} href={`/servers/${id}/channels/1`}>
          {/* TODO: images for servers */}
          {false ? (
            <Image
              className='p-px'
              src={`/${img}`}
              priority
              alt='server icon'
            />
          ) : (
            <div className='truncate px-1'>{label}</div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
