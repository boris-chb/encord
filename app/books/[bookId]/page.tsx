import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const genres = ['Drama', 'Japan'];

const BookPage = () => {
  return (
    <div className='flex w-full grid-cols-6 flex-col bg-gray-50 p-4 sm:grid sm:gap-4 lg:grid-cols-12'>
      {/* left col for Book Cover */}
      <div className='flex-1 sm:col-span-2 lg:col-span-3'>
        <div className='relative mx-auto h-[90%] sm:h-[40%] xl:h-1/2'>
          <Image
            className='rounded-md object-cover shadow-md'
            src='/geisha-cover.jpeg'
            fill
            alt='book cover'
          />
        </div>
      </div>

      {/* right col for Details and Review */}
      <div className='flex flex-1 flex-col gap-2 sm:col-span-4 lg:col-span-9 lg:gap-3'>
        <div className='text-3xl font-bold tracking-tight text-gray-900'>
          Memoirs of a Geisha
        </div>
        <div className='text-xl tracking-tighter text-gray-900'>
          Arthur Golden
        </div>
        <div className='text-gray-900'>My rating: 4/5</div>
        <div className='text-gray-900'>Goodreads: 4.15</div>
        <div className='flex gap-2 text-gray-900'>
          <p>Genres</p>
          {genres.map((genre) => (
            <Link
              className='underline-offset-2 hover:text-gray-700 hover:underline'
              key={genre}
              href='#'
            >
              {genre}
            </Link>
          ))}
        </div>
        <p className='flex flex-col gap-2 text-base text-gray-700'>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ea
            facilis similique temporibus cumque quas laborum, inventore aliquid
            molestiae libero et magnam tempore, aperiam aut, omnis culpa amet!
            Aperiam, consequatur.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            soluta rem deleniti molestiae odit nisi distinctio cumque. Sit ipsum
            a tenetur laudantium quaerat, recusandae natus, minima corporis
            culpa dolores veritatis?
          </p>
        </p>
      </div>
    </div>
  );
};

export default BookPage;
