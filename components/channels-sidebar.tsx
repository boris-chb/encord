'use client';
import ChannelCategories from '@/components/channel-categories';
import ChannelHeader from '@/components/channels/channel-header';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ChannelSidebarProps = {} & React.HTMLProps<HTMLDivElement>;

// has to be client component since it needs to know
// the { serverId } to fetch the categories for the corresponding server

export default function ChannelsSidebar({ className }: ChannelSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { serverId } = useParams();
  // @ts-expect-error
  const serverLabel = categories[0]?.servers.label;

  useEffect(() => {
    async function getCategories(serverId: string) {
      const data = await fetch(`/servers/${serverId}`);

      const { categories }: { categories: Category[] } = await data.json();

      console.log(categories);
      setCategories(categories);
    }
    getCategories(serverId as string);
  }, [serverId]);

  return (
    <aside className={twMerge('w-60 flex-col bg-gray-800', className)}>
      {!categories || categories.length === 0 ? (
        <ChannelsLoading />
      ) : (
        <>
          <ChannelHeader serverLabel={serverLabel} />
          <ChannelCategories categories={categories} />
        </>
      )}
    </aside>
  );
}

function ChannelsLoading() {
  return (
    <div className='mx-auto hidden w-full max-w-sm rounded-md p-4 md:block'>
      <div className='flex animate-pulse space-x-4'>
        <div className='flex-1 space-y-8 py-1'>
          <div className='h-2 rounded bg-gray-200'></div>
          {Array.from({ length: 5 })
            .fill(null)
            .map((_, i) => (
              <div key={i} className='space-y-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='col-span-2 h-2 rounded bg-gray-200'></div>
                  <div className='col-span-1 h-2 rounded bg-gray-200'></div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='col-span-1 h-2 rounded bg-gray-200'></div>
                  <div className='col-span-2 h-2 rounded bg-gray-200'></div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='col-span-2 h-2 rounded bg-gray-200'></div>
                  <div className='col-span-1 h-2 rounded bg-gray-200'></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
