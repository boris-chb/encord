export default function ChannelsSidebar() {
  return (
    <div className="h-full w-60 bg-gray-800 overflow-y-scroll space-y-2">
      <div className="flex items-center h-12 px-3 shadow-md">Tailwind CSS</div>

      <div className="flex-1 p-3 space-y-2 overflow-y-scroll text-gray-300">
        <p className="text-white">channel 0 (unread)</p>
        {[...Array(40)].map((_, i) => (
          <p key={i}>channel {i}</p>
        ))}
      </div>
    </div>
  );
}
