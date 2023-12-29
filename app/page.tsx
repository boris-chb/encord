import Link from 'next/link';
import * as Icons from '@/components/ui/icons';
import MobileSidebar from '@/components/navigation/mobile-sidebar';

export default function Home() {
  return (
    <>
      <FriendsSidebar />
      <main className='relative flex flex-1 flex-col items-center justify-center bg-gray-700'>
        <div className='absolute left-4 top-4'>
          <MobileSidebar />
        </div>
        <span className='text-lg'>Welcome</span>
      </main>
    </>
  );
}

function FriendsSidebar() {
  return (
    <nav
      className='hidden h-full w-60 overflow-y-scroll bg-gray-800 md:block'
      aria-label='Private channels'
    >
      <div className='flex h-12 w-full items-center px-[10px] shadow-sm'>
        <button className='h-7 w-52 truncate rounded bg-gray-900 px-1.5 py-px text-left text-sm text-gray-200'>
          Find or start a conversation
        </button>
      </div>
      <div className='no-scrollbar m-2 flex flex-1 list-none flex-col gap-0.5 overflow-y-scroll text-gray-100'>
        <ListItemLink
          item={{
            label: 'Friends',
            icon: (
              <Icons.PersonWaving className='h-6 w-6 text-gray-200 group-hover:text-white' />
            ),
          }}
        />
        <ListItemLink
          item={{
            label: 'Nitro',
            icon: (
              <Icons.Arrow className='h-6 w-6 text-gray-200 group-hover:text-white' />
            ),
          }}
        />
        <ListItemLink
          item={{
            label: 'Shop',
            icon: (
              <Icons.Shop className='h-6 w-6 text-gray-200 group-hover:text-white' />
            ),
          }}
        />
      </div>
    </nav>
  );
}

function ListItemLink({ item }: any) {
  return (
    <div className='group flex h-11 w-52 cursor-pointer items-center rounded hover:bg-gray-600'>
      <Link className='flex items-center gap-2 px-2' href='/'>
        {item.icon}
        <span className='group-hover:text-white'>{item.label}</span>
      </Link>
    </div>
  );
}
