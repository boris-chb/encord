import moment from 'moment';
import Image from 'next/image';

type MessageProps = { message: MessageWithUserProfile };

export default function Message({
  message: { text, created_at },
}: MessageProps) {
  return (
    <div className='py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      <div className='group flex items-center'>
        <p className='pl-2 text-xs text-gray-200 opacity-0 group-hover:opacity-100'>
          {moment(created_at).format('HH:mm')}
        </p>
        <p className='pl-5 text-gray-100'>{text}</p>
      </div>
    </div>
  );
}

export function MessageThread({
  message: { user, text, created_at },
}: MessageProps) {
  return (
    <div className='mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]'>
      {/* image */}

      <Image
        className='mr-4 mt-0.5 h-10 w-10 rounded-full bg-white p-px'
        src={user.avatar_url || ''}
        width={40}
        height={40}
        alt='avatar'
      />
      <div className=''>
        <p className='flex items-baseline'>
          <span className='mr-2 font-medium text-green-400 hover:cursor-pointer hover:underline '>
            {user.name}
          </span>
          <span className='text-xs font-medium text-gray-400'>
            {moment(created_at).format('DD/MM/YYYY HH:mm')}
          </span>
        </p>
        <p className='text-gray-100'>{text}</p>
      </div>
    </div>
  );
}
