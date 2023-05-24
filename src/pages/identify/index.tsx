import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import plant from '../../icons/plant.png';
import ladybug from '../../icons/ladybug.png';
import mushroom from '../../icons/mushroom.png';
import { useRouter } from 'next/router';

export default function Identify() {
  const router = useRouter();
  const plantsInput = useRef<any>(null);
  const insectsInput = useRef<any>(null);
  const mushroomsInput = useRef<any>(null);
  const [width, setWidth] = useState<number>(0);

  const handleResize = () => setWidth(window.innerWidth);

  const isDesktop = width >= 992;

  const dimension = isDesktop ? 120 : 100;

  const handleClick = (topic: string) => {
    topic === 'plants'
      ? plantsInput.current !== null && plantsInput.current.click()
      : topic === 'insects'
      ? insectsInput.current !== null && insectsInput.current.click()
      : mushroomsInput.current !== null && mushroomsInput.current.click();
  };

  const handleChange = (event: any, topic: string) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      router.replace(
        {
          pathname: '/identify/images',
          query: { image: event.target?.result as string, topic },
        },
        '/identify/images'
      );
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div className='w-full h-full flex justify-evenly items-center flex-col md:flex-row'>
      <div
        onClick={() =>
          isDesktop ? router.push('/identify/plants') : handleClick('plants')
        }
        className='cursor-pointer lg:w-44 lg:h-44 w-36 bg-white h-36 shadow-2xl flex justify-center items-center rounded-full'
      >
        <div className='h-24 w-24 lg:h-32 lg:w-32 justify-center flex'>
          <Image src={plant} alt='plant' width={dimension} height={dimension} />
          {!isDesktop && (
            <input
              id='plants'
              type='file'
              ref={plantsInput}
              accept='image/*'
              onChange={(e) => handleChange(e, 'plants')}
              hidden
            />
          )}
        </div>
      </div>
      <div
        onClick={() =>
          isDesktop ? router.push('/identify/insects') : handleClick('insects')
        }
        className='cursor-pointer w-36 bg-white h-36 lg:w-44 lg:h-44 shadow-md flex justify-center items-center rounded-full'
      >
        <div className='h-24 w-24 lg:h-32 lg:w-32 justify-center flex'>
          <Image
            src={ladybug}
            alt='insect'
            width={dimension}
            height={dimension}
          />
          {!isDesktop && (
            <input
              id='insects'
              type='file'
              ref={insectsInput}
              accept='image/*'
              onChange={(e) => handleChange(e, 'insects')}
              hidden
            />
          )}
        </div>
      </div>
      <div
        onClick={() =>
          isDesktop
            ? router.push('/identify/mushrooms')
            : handleClick('mushrooms')
        }
        className='cursor-pointer w-36 bg-white h-36 lg:w-44 lg:h-44 shadow-md flex justify-center items-center rounded-full'
      >
        <div className='h-24 w-24 lg:h-32 lg:w-32 justify-center flex'>
          <Image
            src={mushroom}
            alt='mushroom'
            width={dimension}
            height={dimension}
          />
          {!isDesktop && (
            <input
              id='mushrooms'
              type='file'
              ref={mushroomsInput}
              accept='image/*'
              onChange={(e) => handleChange(e, 'mushrooms')}
              hidden
            />
          )}
        </div>
      </div>
    </div>
  );
}
