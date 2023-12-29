'use client';
import { ChannelLink } from '@/components/navigation/channel-link';
import NavLink from '@/components/navigation/nav-link';
import * as Icons from '@/components/ui/icons';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

export default function ChannelHeader({
  serverLabel,
}: {
  serverLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleEscape(e: globalThis.KeyboardEvent) {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className='relative flex justify-center'>
      <button
        type='button'
        // show modal on click
        onClick={(e) => {
          setIsOpen(!isOpen);
        }}
        className='hover:bg-gray-550/[0.16] relative z-10 flex h-12 w-full items-center px-4 text-[15px] shadow-md transition focus:outline-none'
      >
        <div className='relative mr-1 h-4 w-4'>
          <Icons.Verified className='text-gray-550 absolute h-4 w-4' />
          <Icons.Check className=' absolute h-4 w-4' />
        </div>
        {serverLabel}
        <Icons.Chevron className='ml-auto h-[18px] w-[18px] opacity-80' />
      </button>

      {!isOpen ? null : (
        <>
          {/*  */}
          <button
            onClick={() => setIsOpen(false)}
            className='fixed inset-0 h-full w-full cursor-default'
            tabIndex={-1}
          ></button>

          <div
            className={`absolute top-14 z-10 h-fit w-[90%] rounded bg-black p-2 shadow-md`}
          >
            <div className='hover:bg-brand rounded-[2px] px-2 py-1.5'>
              Server Boost
            </div>
            {/* separator */}
            <div className='m-0.5 w-full border-b-[0.5px] border-[#4e50587a]'></div>
            <div className='hover:bg-brand rounded-[2px] px-2 py-1.5'>
              Invite People
            </div>
            <div className='hover:bg-brand rounded-[2px] px-2 py-1.5'>
              Server Settings
            </div>
            <div className='hover:bg-brand rounded-[2px] px-2 py-1.5'>
              Create Channel
            </div>
          </div>
        </>
      )}
    </div>
  );
}
