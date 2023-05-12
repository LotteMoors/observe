import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import honeycomb from '../icons/honeycomb.jpeg';

export default function Home() {
  const router = useRouter();

  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <div
        onClick={() => router.push('/identify')}
        className='w-full bg-white h-full flex justify-center flex-row items-center border-b-2 border-slate-500'
      >
        <div>
          <FontAwesomeIcon size='2xl' icon={faMagnifyingGlass} />
        </div>
        <h1 className='text-2xl font-regular ml-10'>Identify</h1>
      </div>
      <div className='w-full bg-white h-full flex justify-center flex-row items-center border-b-2 border-slate-500'>
        <div>
          <Image src={honeycomb} alt='plant' width={70} height={70} />
        </div>
        <h1 className='text-2xl font-regular ml-5'>Collection</h1>
      </div>

      <div className='w-full bg-white h-full flex justify-center flex-row items-center'>
        <FontAwesomeIcon size='2xl' icon={faHouse} />
        <h1 className='text-2xl font-regular ml-10'>Home</h1>
      </div>
    </div>
  );
}
