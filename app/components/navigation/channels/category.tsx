'use client';
import { useEffect, useState } from 'react';
import { ChannelLink } from '../channel-link';
import * as Icons from '@/app/components/ui/icons';

export default function ChannelCategory({ category }: any) {
  const [closedCategories, setClosedCategories] = useState<number[]>([]);

  useEffect(() => {
    // store collapsed categories in local storage
    const savedClosedCategories = localStorage.getItem('collapsedCategories');

    const closedCategories = savedClosedCategories
      ? JSON.parse(savedClosedCategories)
      : [];

    setClosedCategories(closedCategories);
  }, []);

  function toggleCategory(categoryId: number) {
    setClosedCategories((prevClosedCategories) => {
      const updatedClosedCategories = prevClosedCategories.includes(categoryId)
        ? prevClosedCategories.filter((id) => id !== categoryId)
        : [...prevClosedCategories, categoryId];

      // Update localStorage
      localStorage.setItem(
        'collapsedCategories',
        JSON.stringify(updatedClosedCategories)
      );

      return updatedClosedCategories;
    });
  }

  return (
    <div>
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
          />
          {category.label}
        </button>
      )}

      {/* channels */}
      <div className='mt-[5px] space-y-0.5'>
        {category.channels
          .filter((channel: any) => {
            // filter channels to show only unread when
            // category is collapsed

            let isOpen = !closedCategories.includes(category.id);

            return isOpen || channel?.unread;
          })
          .map((channel: any) => (
            <ChannelLink key={channel.id} channel={channel} />
          ))}
      </div>
    </div>
  );
}
