import * as Icons from '@/app/components/ui/icons';
import ChannelCategory from './navigation/channels/category';
import { twMerge } from 'tailwind-merge';

type ChannelSidebarProps = {
  categories: any[];
} & React.HTMLProps<HTMLDivElement>;

export default function ChannelsSidebar({
  categories,
  className,
}: ChannelSidebarProps) {
  const serverLabel = categories[0]?.servers.label;

  return (
    <nav className={twMerge('w-60 flex-col bg-gray-800', className)}>
      {/* channel header */}
      <button
        type='button'
        className='flex h-12 w-full items-center px-4 text-[15px] shadow-md transition hover:bg-gray-550/[0.16]'
      >
        <div className='relative mr-1 h-4 w-4'>
          <Icons.Verified className='absolute h-4 w-4 text-gray-550' />
          <Icons.Check className=' absolute h-4 w-4' />
        </div>
        {serverLabel}
        <Icons.Chevron className='ml-auto h-[18px] w-[18px] opacity-80' />
      </button>

      {/* categories */}
      <div className='flex-1 space-y-[21px] overflow-y-auto pt-3 text-gray-300'>
        {categories.map((category: any) => (
          <ChannelCategory key={category.id} category={category} />
        ))}
      </div>
    </nav>
  );
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
