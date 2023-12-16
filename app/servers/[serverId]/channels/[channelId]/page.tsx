import * as Icons from '@/app/components/ui/icons';
import { createSupabaseClient } from '@/app/lib/db';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function ChannelPage({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const supabase = createSupabaseClient(cookies());

  const { data: channel, error } = await supabase
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

  const dummyChannel = {
    label: 'share with community',
    description:
      'This is a channel description for demo purposes.This is a channel description for demo purposes.This is a channel description for demo purposes.',
    messages: [
      {
        text: "Hey, how's it going?",
        user: { name: 'leerob', avatarUrl: '/vercel.svg' },
        date: '01-04-2023',
      },
      {
        text: 'Pretty good, working on my project. You?',
        user: { name: 'py.dev', avatarUrl: '/python.svg' },
        date: '01-04-2023',
      },
      {
        text: "Just chilling. What's your project about?",
        user: { name: 'mohammed', avatarUrl: '/next.svg' },
        date: '01-04-2023',
      },
      {
        text: "It's a Discord clone!",
        user: { name: 'leerob', avatarUrl: '/vercel.svg' },
        date: '02-04-2023',
      },
      {
        text: "Wow, that's pretty cool.",
        user: { name: 'py.dev', avatarUrl: '/python.svg' },
        date: '02-04-2023',
      },
      {
        text: 'Must be a lot of work to make it happen.',
        user: { name: 'py.dev', avatarUrl: '/python.svg' },
        date: '02-04-2023',
      },
      {
        text: "Yeah, can't wait to see it when it's done.",
        user: { name: 'mohammed', avatarUrl: '/next.svg' },
        date: '02-04-2023',
      },
      {
        text: 'Let me know if you need any help!',
        user: { name: 'mohammed', avatarUrl: '/next.svg' },
        date: '02-04-2023',
      },
      {
        text: "I'll definitely need your feedback.",
        user: { name: 'leerob', avatarUrl: '/vercel.svg' },
        date: '03-04-2023',
      },
      {
        text: 'There are a few things I would like to make, but not sure whether I should integrate them into final version.',
        user: { name: 'leerob', avatarUrl: '/vercel.svg' },
        date: '03-04-2023',
      },
      {
        text: "I'll share a demo with you folks once it's ready for deployment!",
        user: { name: 'leerob', avatarUrl: '/vercel.svg' },
        date: '03-04-2023',
      },
      {
        text: 'Count me in for the beta test!',
        user: { name: 'py.dev', avatarUrl: '/python.svg' },
        date: '03-04-2023',
      },
      {
        text: "I'm always here to help!",
        user: { name: 'mohammed', avatarUrl: '/next.svg' },
        date: '03-04-2023',
      },
      {
        text: 'Thanks, guys!',
        user: { name: 'leerob', avatarUrl: '/vercel.svg' },
        date: '04-04-2023',
      },
    ],
  };

  return (
    // text has minimum width, which flexbox respects
    // min-w-0 tells flexbox to shrink the text if necessary
    // then using truncate will create ellipsis effect
    <main className='flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700'>
      {/* channel navbar */}
      <nav className='flex h-12 items-center px-3 shadow-sm'>
        <div className='flex items-center'>
          <Icons.Hashtag className='mx-2 h-6 w-6 font-semibold text-gray-400' />
          {/* TODO: replace with actual channel label */}
          <span className='font-title mr-2 whitespace-nowrap text-white'>
            {channel.label}
          </span>
        </div>
        {channel.description && (
          <>
            <div className='mx-2 h-6 w-px bg-white/[.06]' />
            <div className='mx-2 truncate text-sm font-medium text-gray-200'>
              {channel.description}
            </div>
          </>
        )}
        {/* icons */}
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
          <div className='relative mx-2'>
            <input
              placeholder='Search'
              type='text'
              className='h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400'
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
      <div className='flex-1 overflow-y-scroll p-3'>
        {channel.messages.map((message, i) => (
          <div key={i}>
            {i === 0 ||
            message.user.name !== channel.messages[i - 1].user.name ? (
              <MessageThread message={message} />
            ) : (
              <Message message={message} />
            )}
          </div>
        ))}
      </div>
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

function MessageThread({ message }: { message: MessageProps }) {
  const { user, text, date } = message;

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
          <span className='mr-2 font-medium text-green-400'>{user.name}</span>
          <span className='text-xs font-medium text-gray-400'>{date}</span>
        </p>
        <p className='text-gray-100'>{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }: { message: MessageProps }) {
  return (
    <div className='py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <p className='pl-14 text-gray-100'>{message.text}</p>
    </div>
  );
}
