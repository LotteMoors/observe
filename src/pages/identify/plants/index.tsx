import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import SnapShot from '@/components/snapshot';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Plants() {
  const router = useRouter();
  const camera = useRef<any>([]);
  const [img, setImg] = useState<string>();
  const [fileName, setFileName] = useState('');

  // const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files === null) return;
  //   setFileName(e.target.files[0].name);
  //   if (e.target.files[0]) {
  //     console.log('picture: ', e.target.files);
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       setImg(typeof reader.result === 'string' ? reader.result : '');
  //     });
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  useEffect(() => {
    if (img) {
      router.replace(
        {
          pathname: '/identify/images',
          query: { image: img, topic: 'plants'  },
        },
        '/identify/images'
      );
    }
  }, [img, router]);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='h-full w-full flex flex-row relative'>
        <div>
          <SnapShot innerRef={camera} />
        </div>
        <div className='bg-transparent absolute top-8 right-8 z-100'>
          <button
            data-te-ripple-init
            data-te-ripple-color='light'
            className='rounded-full active:bg-gray-400 h-20 w-20 bg-white border-2 borde r-slate-600 p-3'
            onClick={() => camera.current && setImg(camera.current.takePhoto())}
          >
            <FontAwesomeIcon size='2xl' icon={faCamera} />
          </button>
        </div>
      </div>
    </div>
  );
}
