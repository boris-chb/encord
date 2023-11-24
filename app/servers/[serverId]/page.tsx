import ChannelsSidebar from "@/app/components/channels-sidebar";

interface ServerProps {
  params: { serverId: string };
}

export default function ServerPage({ params: { serverId } }: ServerProps) {
  return (
    <>
      <ChannelsSidebar />
      <main className="bg-gray-700 flex flex-col flex-1">
        <div className="flex items-center h-12 px-3 shadow-sm">#general</div>
        <div className="flex-1 p-3 space-y-4 overflow-y-scroll">
          {[...Array(40)].map((_, i) => (
            <p key={i}>
              Message {i}. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia deleniti fugiat, unde explicabo nemo incidunt quam
              similique assumenda dolorum vitae, molestiae quaerat cupiditate
              esse optio error reiciendis, ab tempora dolore?
            </p>
          ))}
        </div>
      </main>
    </>
  );
}
