'use client';

import Message, { MessageThread } from '@/components/messages/message';
import { Hashtag } from '@/components/ui/icons';
import { useEffect, useRef } from 'react';

interface ChannelMessageProps {
  channel: Channel & {
    messages: MessageWithUserProfile[];
  };
}

export default function ChannelMessages({
  channel: { messages, label },
}: ChannelMessageProps) {
  const bottomMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomMessageRef.current) {
      bottomMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='h-full flex-1 overflow-y-scroll pb-2'>
      {messages.length > 0 ? (
        messages.map((message, i: number) => (
          <div
            key={i}
            ref={i === messages.length - 1 ? bottomMessageRef : null}
          >
            {/* multiple consecutive messages => render a thread
                otherwise renders a single message
             */}
            {i === 0 || message.user.name !== messages[i - 1].user.name ? (
              <MessageThread message={message} />
            ) : (
              <Message message={message} />
            )}
          </div>
        ))
      ) : (
        <div className='flex h-[calc(100%)] flex-col justify-end p-4'>
          <p className='bg-gray-550 mt-4 flex h-14 w-14 items-center justify-center rounded-full'>
            <Hashtag className='h-10 w-10 text-white' />
          </p>
          <h3 className='my-2 text-3xl font-bold tracking-wide'>
            Welcome to #{label}
          </h3>
          <p>This is the start of #{label} channel.</p>
        </div>
      )}
    </div>
  );
}
