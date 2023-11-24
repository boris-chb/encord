import {
  CheckIcon,
  ChevronIcon,
  VerifiedIcon,
} from '@/app/components/ui/icons';

export default function ChannelsSidebar() {
  return (
    <nav className='h-full w-60 space-y-2 overflow-y-scroll bg-gray-800'>
      <button className='flex h-12 w-full items-center px-4 text-[15px] shadow-md transition hover:bg-gray-550/[0.16]'>
        <div className='relative mr-1 h-4 w-4'>
          <VerifiedIcon className='absolute h-4 w-4 text-gray-550' />
          <CheckIcon className=' absolute h-4 w-4' />
        </div>
        Tailwind CSS
        <ChevronIcon className='ml-auto h-[18px] w-[18px] opacity-80' />
      </button>

      <div className='flex-1 space-y-2 overflow-y-scroll p-3 text-gray-300'>
        <p className='text-white'>channel 0 (unread)</p>
        {[...Array(40)].map((_, i) => (
          <p key={i}>channel {i}</p>
        ))}
      </div>
    </nav>
  );
}
