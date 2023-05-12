import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import plant from '../../icons/plant.png';
import ladybug from '../../icons/ladybug.png';
import mushroom from '../../icons/mushroom.png';
import { useRouter } from 'next/router';

export default function Identify() {
  const router = useRouter();
  const hiddenFileInput = useRef(null);
  const [width, setWidth] = useState<number>(0);

  function handleWindowSizeChange() {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isDesktop = width >= 992;

  const handleClick = (event) => {
    hiddenFileInput.current !== null && hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    router.replace({
      pathname: '/identify/result',
      query: { 'image': event },
    });
  };

  return (
    <div className='w-full h-full flex justify-evenly items-center flex-col'>
      <div
        onClick={() => isDesktop && router.push('/identify/plants')}
        className=' cursor-pointer w-36 bg-white h-36 border-2 border-slate-500 shadow-2xl flex justify-center items-center rounded-full'
      >
        <div className='h-24 w-24'>
          <Image
            onClick={(e) => !isDesktop && handleClick(e)}
            src={plant}
            alt='plant'
            width={100}
            height={100}
          />
          {console.info(hiddenFileInput)}
          <input
            type='file'
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className='w-36 bg-white h-36 border-2 border-slate-500 shadow-md flex justify-center items-center rounded-full'>
        <div className='h-24 w-24'>
          <Image src={ladybug} alt='plant' width={100} height={100} />
        </div>
      </div>
      <div className='w-36 bg-white h-36 border-2 border-slate-500 shadow-md flex justify-center items-center rounded-full'>
        <div className='h-24 w-24'>
          <Image src={mushroom} alt='plant' width={100} height={100} />
        </div>
      </div>
    </div>
  );
}
