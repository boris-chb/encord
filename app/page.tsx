export default function Home() {
  return (
    <>
      {/* second sidebar */}
      <nav className='h-full w-60 space-y-2 overflow-y-scroll bg-gray-800'>
        <div className='flex h-12 items-center px-3 shadow-sm'>Dashboard</div>
        <div className='flex-1 space-y-2 overflow-y-scroll p-3 text-gray-100'>
          Friends
        </div>
      </nav>

      {/* page content */}
      <main className='flex flex-1 flex-col bg-gray-700'>
        Welcome to discord
      </main>
    </>
  );
}
