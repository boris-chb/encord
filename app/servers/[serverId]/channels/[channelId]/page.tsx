import MessageInput from '@/app/components/message-input';
import MobileSidebar from '@/app/components/navigation/mobile-sidebar';
import * as Icons from '@/app/components/ui/icons';
import { createServerClient } from '@/app/lib/db';
import moment from 'moment';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function ChannelPage({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const supabase = createServerClient(cookies());

  const { data: channels, error } = await supabase
    .from('channels')
    .select(
      `
    *,
    messages(*, user:profiles!inner(id, avatar_url, name))
  `
    )
    .eq('id', params.channelId)
    .single();

  if (error) {
    console.log(error);
    throw new Error('Could not fetch channel messages');
  }

  channels.messages.sort(
    // @ts-ignore
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return (
    // text has minimum width, which flexbox respects
    // min-w-0 tells flexbox to shrink the text if necessary
    // then using truncate will create ellipsis effect
    <main className='flex min-w-0 flex-1 flex-col bg-gray-700'>
      {/* channel navbar */}
      <nav className='flex h-12 max-w-full items-center px-3 shadow-sm'>
        <MobileSidebar />

        <div className='flex flex-auto items-center lg:min-w-0 '>
          <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
          <span className='font-title overflow-hidden truncate text-white'>
            {channels.label}
          </span>
        </div>
        {channels.description && (
          <>
            <div className='mx-2 hidden h-6 w-px bg-white/[.06] md:block' />
            <div className='mx-2 hidden truncate text-sm font-medium text-gray-200 md:block'>
              {channels.description}
            </div>
          </>
        )}
        {/* mobile icons */}
        <div className='ml-auto flex flex-none items-center md:hidden'>
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
      <div className='h-full flex-1 overflow-y-scroll p-3'>
        {channels.messages.length > 0 ? (
          channels.messages.map((message: Message, i: number) => (
            <div key={i}>
              {i === 0 ||
              message.user.name !== channels.messages[i - 1].user.name ? (
                <MessageThread message={message} />
              ) : (
                <Message message={message} />
              )}
            </div>
          ))
        ) : (
          <div className='m-4 flex h-full flex-col justify-end'>
            <p className='mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-550'>
              <Icons.Hashtag className='h-10 w-10 text-white' />
            </p>
            <h3 className='my-2 text-3xl font-bold tracking-wide'>
              Welcome to #{channels.label}
            </h3>
            <p>This is the start of #{channels.label} channel.</p>
          </div>
        )}
      </div>
      <MessageInput />
    </main>
  );
}

type MessageProps = {
  text: string;
  user: {
    name: string;
    avatar_url: string; // default to hardcoded '/vercel.svg', '/python.svg', and '/next.svg' for now
  };
  date: string; // for now hardcode some strings in the format DD-MM-YYYY, later ill use moment.js with actual datetime
};

function MessageThread({ message }: { message: Message }) {
  const { user, text, created_at } = message;

  return (
    <div className='mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      {/* image */}

      <Image
        className='mr-4 mt-0.5 h-10 w-10 rounded-full bg-white p-px'
        src={user.avatar_url || ''}
        width={40}
        height={40}
        alt='avatar'
      />
      <div className=''>
        <p className='flex items-baseline'>
          <span className='mr-2 font-medium text-green-400 hover:cursor-pointer hover:underline '>
            {user.name}
          </span>
          <span className='text-xs font-medium text-gray-400'>
            {moment(created_at).format('DD/MM/YYYY HH:mm')}
          </span>
        </p>
        <p className='text-gray-100'>{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }: { message: Message }) {
  return (
    <div className='py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <div className='group flex items-center'>
        <p className='pl-2 text-xs text-gray-200 opacity-0 group-hover:opacity-100'>
          {moment(message.created_at).format('HH:mm')}
        </p>
        <p className='pl-5 text-gray-100'>{message.text}</p>
      </div>
    </div>
  );
}
