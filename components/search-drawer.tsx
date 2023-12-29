import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function SearchDrawer({ children }: any) {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className='m-1 h-[90%] border-none bg-inherit'>
        <DrawerHeader>
          <DrawerTitle>Search</DrawerTitle>
          <DrawerDescription>Search users or messages.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
