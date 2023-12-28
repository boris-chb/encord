import React from 'react';
import * as Icons from '@/app/components/ui/icons';

type MessageInputProps = {};

export default function MessageInput({}: MessageInputProps) {
  return (
    <form className='-mt-2 h-[68px] px-4'>
      <div className='flex items-center justify-center overflow-hidden rounded bg-gray-800'>
        <IconButton>
          <Icons.Plus className='m-2 h-6 w-6' />
        </IconButton>

        <input
          className='x w-full truncate border-none bg-gray-800/60 focus:border-transparent focus:outline-none focus:ring-0'
          type='text'
          name='message-input'
          id='message-input'
          placeholder='Message #channel-name'
        />

        <div className='flex'>
          <IconButton>
            <Icons.Gift className='h-6 w-6' />
          </IconButton>
          <IconButton>
            <Icons.Gif className='h-6 w-6' />
          </IconButton>
          <IconButton>
            <Icons.Sticker className='h-6 w-6' />
          </IconButton>
        </div>
      </div>
    </form>
  );
}

function IconButton({ children }: any) {
  return (
    <button className=' flex h-10 w-10 items-center justify-center bg-gray-800/60 transition duration-150 hover:text-white'>
      {children}
    </button>
  );
}
