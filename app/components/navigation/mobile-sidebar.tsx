'use client';

import ChannelsSidebar from '@/app/components/channels-sidebar';
import ServersSidebar from '@/app/components/server-sidebar';
import { HamburgerMenu } from '@/app/components/ui/icons';
import React, { useState } from 'react';

// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Props = {};

export default function MobileSidebar({ ...props }: any) {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <HamburgerMenu className='h-6 w-6 text-gray-200' />
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className='border-none bg-gray-500 p-0 lg:w-fit'
      >
        <div className='relative flex h-full'>
          <ServersSidebar className='flex' servers={[]} />
          <ChannelsSidebar className='flex w-full' categories={[]} />
        </div>
      </SheetContent>
    </Sheet>

    // <>
    //   {isHidden ? (
    //     <HamburgerMenu
    //       onClick={() => setIsHidden(!isHidden)}
    //       className='h-6 w-6 text-gray-200'
    //     />
    //   ) : (

    //   )}
    // </>
  );
}
