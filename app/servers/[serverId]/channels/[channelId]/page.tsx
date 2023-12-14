import * as Icons from '@/app/components/ui/icons';

const ChannelPage = (params: any) => {
  const channel = {
    label: 'general',
    description:
      'This is a channel description for demo purposes.This is a channel description for demo purposes.This is a channel description for demo purposes.',
    messages: ['Hello friends', 'How is everyone doing today?'],
  };

  return (
    // text has minimum width, which flexbox respects
    // min-w-0 tells flexbox to shrink the text if necessary
    // then using truncate will create ellipsis effect
    <main className='flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700'>
      <div className='flex h-12 items-center px-3 shadow-sm'>
        <div className='flex items-center'>
          <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
          {/* TODO: replace with actual channel label */}
          <span className='font-title mr-2 text-white'>{channel.label}</span>
        </div>
        {channel.description && (
          <>
            <div className='mx-2 h-6 w-px bg-white/[.06]' />
            <div className='mx-2 truncate text-sm font-medium text-gray-200'>
              {channel.description}
            </div>
          </>
        )}
        <div className='ml-auto flex items-center'>
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
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.Inbox className='mx-2 h-6 w-6' />
          </button>
          <button className='text-gray-200 hover:text-gray-100' type='button'>
            <Icons.QuestionCircle className='mx-2 h-6 w-6' />
          </button>
        </div>
      </div>
      <div className='flex-1 space-y-4 overflow-y-scroll p-3'>
        {[...Array(30)].map((_, i) => (
          <p key={i}>
            Message {i}. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Mollitia deleniti fugiat, unde explicabo nemo incidunt quam
            similique assumenda dolorum vitae, molestiae quaerat cupiditate esse
            optio error reiciendis, ab tempora dolore?
          </p>
        ))}
      </div>
    </main>
  );
};

export default ChannelPage;
