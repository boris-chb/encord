'use client';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function NavLink({
  href,
  children,
}: {
  href: any;
  children: React.ReactNode;
}) {
  const { serverId } = useParams();
  const isActive = +serverId === +href.serverId;

  return (
    <Link
      prefetch
      href={`/servers/${href.serverId}/channels/${href.channelId}`}
      className='group relative cursor-pointer rounded-2xl'
    >
      <div className='absolute -left-3 flex h-full items-center'>
        <div
          className={`${
            isActive
              ? 'h-10'
              : 'h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
          } w-1 origin-left rounded-r bg-white transition-all duration-200`}
        ></div>
      </div>
      <div
        className={`${
          isActive
            ? 'bg-brand rounded-2xl text-white'
            : 'group-hover:bg-brand rounded-3xl bg-gray-700 text-gray-100 group-hover:rounded-2xl group-hover:text-white'
        } flex h-12 w-12 items-center justify-center  overflow-hidden transition-all  duration-200 group-active:translate-y-px`}
      >
        {children}
      </div>
    </Link>
  );
}
