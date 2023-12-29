import ChannelsSidebar from '@/components/channels-sidebar';

export default async function ServerLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <>
      <ChannelsSidebar className='hidden md:flex' />
      {children}
    </>
  );
}
