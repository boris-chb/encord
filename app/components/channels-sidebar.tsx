'use client';
import * as Icons from '@/app/components/ui/icons';

import data from '@/data.json';
import { ChannelLink } from '@/app/components/navigation/channel-link';
import { useState } from 'react';

export default function ChannelsSidebar() {
  const [closedCategories, setClosedCategories] = useState<number[]>([]);

  function toggleCategory(categoryId: number) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId]
    );
  }

  return (
    <nav className='flex w-60 flex-col bg-gray-800'>
      {/* channel header */}
      <button
        type='button'
        className='flex h-12 w-full items-center px-4 text-[15px] shadow-md transition hover:bg-gray-550/[0.16]'
      >
        <div className='relative mr-1 h-4 w-4'>
          <Icons.Verified className='absolute h-4 w-4 text-gray-550' />
          <Icons.Check className=' absolute h-4 w-4' />
        </div>
        Tailwind CSS
        <Icons.Chevron className='ml-auto h-[18px] w-[18px] opacity-80' />
      </button>

      {/* categories */}
      <div className='flex-1 space-y-[21px] overflow-y-scroll pt-3 text-gray-300'>
        {data['1'].categories.map((category) => (
          <div key={category.id}>
            {category.label && (
              <button
                onClick={() => toggleCategory(category.id)}
                type='button'
                className='flex w-full items-center px-0.5 text-xs uppercase tracking-wide hover:text-gray-100'
              >
                <Icons.Arrow
                  className={`${
                    closedCategories.includes(category.id) && '-rotate-90'
                  } mr-1 h-3 w-3 transition duration-200`}
                />{' '}
                {category.label}
              </button>
            )}

            <div className='mt-[5px] space-y-0.5'>
              {category.channels
                .filter((channel) => {
                  // filter channels to show only unread when
                  // category is collapsed

                  let isOpen = !closedCategories.includes(category.id);

                  // not inferring types properly from json
                  // @ts-expect-error
                  return isOpen || channel?.unread;
                })
                .map((channel) => (
                  <ChannelLink key={channel.id} channel={channel} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
