import { Discord } from '@/app/components/ui/icons';
import NavLink from '@/app/components/navigation/nav-link';
import Image from 'next/image';

const servers = [
  { id: 1, img: 'next.svg' },
  { id: 2, img: 'vercel.svg' },
];

export default function ServersSidebar() {
  return (
    <nav className='flex flex-col gap-2 overflow-y-scroll bg-gray-900 p-3'>
      <NavLink href='/'>
        <Discord className='h-5 w-7' />
      </NavLink>

      <hr className='mx-2 rounded border-t-2 border-t-white/[.06]' />

      {servers.map(({ id, img }) => (
        <NavLink key={id} href={`/servers/${id}`}>
          <Image src={`/${img}`} fill alt='server icon' />
        </NavLink>
      ))}
    </nav>
  );
}
