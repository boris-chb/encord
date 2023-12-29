'use client';
import { HamburgerMenu } from '@/components/ui/icons';

import {
  Sheet,
  SheetClose as CloseSheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import useStore from '@/lib/store';
import React from 'react';

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof CloseSheet>
>((props, ref) => <CloseSheet className='hidden' ref={ref} {...props} />);

SheetClose.displayName = 'SheetClose';

export default function MobileSidebar({ children, ...props }: any) {
  const setSheetCloseRef = useStore((state) => state.setSheetCloseRef);

  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <HamburgerMenu className='h-6 w-6 text-gray-200' />
      </SheetTrigger>

      <SheetClose className='hidden' ref={setSheetCloseRef} />

      <SheetContent
        side={'left'}
        className='flex h-full w-fit gap-0 border-none bg-gray-500 p-0 md:hidden'
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
