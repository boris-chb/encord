import * as Icons from '@/app/components/ui/icons';
import Link from 'next/link';

import data from '@/data.json';

export default function ChannelsSidebar() {
  return (
    <nav className='flex w-60 flex-col bg-gray-800'>
      <button className='flex h-12 w-full items-center px-4 text-[15px] shadow-md transition hover:bg-gray-550/[0.16]'>
        <div className='relative mr-1 h-4 w-4'>
          <Icons.Verified className='absolute h-4 w-4 text-gray-550' />
          <Icons.Check className=' absolute h-4 w-4' />
        </div>
        Tailwind CSS
        <Icons.Chevron className='ml-auto h-[18px] w-[18px] opacity-80' />
      </button>

      <div className='flex-1 space-y-[21px] overflow-y-scroll pt-3 text-gray-300'>
        {/* categories */}
        {data['1'].categories.map((category) => (
          <div key={category.id}>
            {category.label && (
              <button className='flex items-center px-0.5 text-xs uppercase tracking-wide'>
                <Icons.Arrow className='mr-1 h-3 w-3' /> {category.label}
              </button>
            )}

            <div className='mt-[5px] space-y-0.5'>
              {category.channels.map((channel) => (
                <ChannelLink key={channel.id} channel={channel} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

function ChannelLink({ channel }: any) {
  // @ts-ignore
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  return (
    <Link
      key={channel.id}
      href={'#'}
      className='group mx-2 flex items-center rounded px-2 py-1 hover:bg-gray-550/[0.16] hover:text-gray-100'
    >
      <Icon className='mr-1.5 h-5 w-5 text-gray-400' />
      {channel.label}
      <Icons.AddPerson className='ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100' />
    </Link>
  );
}
