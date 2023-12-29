import ChannelMessages from '@/components/messages/channel-messages';
import MessageInput from '@/components/messages/message-input';
import MobileSidebar from '@/components/navigation/mobile-sidebar';
import SearchDrawer from '@/components/search-drawer';
import * as Icons from '@/components/ui/icons';
import { getChannelById } from '@/db/channels';
import getServersWithChannels from '@/db/servers';

export default async function ChannelPage({
  params: { serverId, channelId },
}: {
  params: { serverId: string; channelId: string };
}) {
  const channel = await getChannelById(channelId);

  return (
    // text has minimum width, which flexbox respects
    // min-w-0 tells flexbox to shrink the text if necessary
    // then using truncate will create ellipsis effect
    <main className='flex min-w-0 flex-1 flex-col bg-gray-700'>
      {/* channel navbar */}
      <nav className='flex h-12 max-w-full items-center px-3 shadow-sm'>
        {/* <MobileSidebar channel={channel} /> */}

        <div className='flex flex-auto items-center pl-6 md:p-0 lg:min-w-0 '>
          <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
          <span className='font-title overflow-hidden truncate text-white'>
            {channel.label}
          </span>
        </div>
        {channel.description && (
          <>
            <div className='mx-2 hidden h-6 w-px bg-white/[.06] md:block' />
            <div className='mx-2 hidden truncate text-sm font-medium text-gray-200 md:block'>
              {channel.description}
            </div>
          </>
        )}
        {/* mobile icons */}
        <div className='ml-auto flex flex-none items-center rounded-full bg-gray-600 p-1 md:hidden'>
          <SearchDrawer>
            <Icons.Spyglass className='h-4 w-4 text-gray-200' />
          </SearchDrawer>
        </div>

        {/* desktop icons */}
        <div className='ml-auto hidden items-center md:flex'>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.HashtagWithSpeechBubble className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.Bell className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.Pin className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.People className='mx-2 h-6 w-6' />
          </button>
          <div className='relative mx-2'>
            <input
              placeholder='Search'
              type='text'
              className='h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400 transition-[width] duration-300 focus:w-60 focus:border-transparent focus:outline-none focus:ring-0'
            />
            <div className='absolute inset-y-0 right-0 mr-1.5 flex items-center text-gray-400'>
              <Icons.Spyglass className='h-4 w-4' />
            </div>
          </div>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.Inbox className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.QuestionCircle className='mx-2 h-6 w-6' />
          </button>
        </div>
      </nav>
      {/* messages */}
      <ChannelMessages channel={channel} />
      <MessageInput />
    </main>
  );
}
