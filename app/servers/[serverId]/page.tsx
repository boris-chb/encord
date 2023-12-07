import ChannelsSidebar from '@/app/components/channels-sidebar';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

interface ServerProps {
  params: { serverId: string };
}

export function generateStaticParams() {
  const serverIds = [1, 2, 3, 4];

  return serverIds.map((id) => ({ serverId: `${id}` }));
}

export default async function ServerPage({
  params: { serverId },
}: ServerProps) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const allNotes = await supabase.from('notes').select('*');

  return (
    <>
      <main className='flex flex-1 flex-col bg-gray-700'>
        <div className='flex h-12 items-center px-3 shadow-sm'>#general</div>
        <div className='flex-1 space-y-4 overflow-y-scroll p-3'>
          {[...Array(40)].map((_, i) => (
            <p key={i}>
              Message {i}.<br /> Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Mollitia deleniti fugiat, unde explicabo nemo
              incidunt quam similique assumenda dolorum vitae, molestiae quaerat
              cupiditate esse optio error reiciendis, ab tempora dolore?
            </p>
          ))}
        </div>
      </main>
    </>
  );
}
