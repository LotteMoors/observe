import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import mockImages from '../../../example.json';
import 'react-circular-progressbar/dist/styles.css';

export default function Result() {
  const router = useRouter();
  const { response: response } = router.query;

  const suggestions = response ? JSON.parse(response as string) : mockImages;

  return (
    <div className='flex p-4 flex-col w-full justify-center items-center my-4'>
      <div className='flex p-8 h-96 w-full bg-white justify-center rounded-md flex-col'>
        <div className='relative h-72'>
          <div className='h-64 w-64 left-1/2 top-0 transform -translate-x-1/2 rounded-md absolute overflow-hidden'>
            <Image
              src={suggestions[0].similar_images[0].url as string}
              alt='image'
              object-fit='cover'
              fill={true}
            />
          </div>
        </div>
        <div className='flex flex-row items-center gap-8 ml-2 w-64'>
          <span className='border rounded-md text-sm border-gray-500 p-1 w-10 text-center'>
            {Math.round(suggestions[0].probability * 100)}%
          </span>
          <p className='text-sm text-center'>{suggestions[0].plant_name}</p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-12 w-full'>
        <button
          className='bg-gray-500 text-white h-12 rounded-md'
          onClick={() =>
            router.replace({
              pathname: '/identify',
            })
          }
        >
          GO BACK
        </button>
        <button className='bg-yellow-500 text-white h-12 rounded-md'>
          COLLECT
        </button>
      </div>
    </div>
  );
}
