import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Camera from '@/components/camera';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Plants() {
  const router = useRouter();
  const camera = useRef(null);
  const [img, setImg] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);

  const URL = 'https://api.plant.id/v2/identify';

  const data = {
    // api_key: process.env.NEXT_PUBLIC_PLANT_API_KEY,
    images: [img],
    // modifiers: ['crops_fast', 'similar_images'],
    // plant_details: [
    //   'common_names',
    //   'url',
    //   'name_authority',
    //   'wiki_description',
    //   'taxonomy',
    //   'synonyms',
    // ],
  };

  const headers = {
    'Content-Type': 'application/json',
    'Api-Key': process.env.NEXT_PUBLIC_PLANT_API_KEY,
  };

  const Identify = () => {
    axios
      .post(URL, data, { headers })
      .then((res) => {
        console.log('Success:', res.data);
        setResponse(res.data);
        res.data.is_plant === false ? setError(true) : setError(false);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setFileName(e.target.files[0].name);
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImg(typeof reader.result === 'string' ? reader.result : '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='h-full w-full flex flex-row relative'>
        <div>
          <Camera innerRef={camera} />
        </div>
        <div className='bg-transparent absolute top-8 right-8 z-100'>
          <button
            data-te-ripple-init
            data-te-ripple-color='light'
            className='rounded-full active:bg-gray-400 h-20 w-20 bg-white border-2 border-slate-600 p-3'
            onClick={() => (
              setImg(camera.current.takePhoto()),
              router.replace({
                pathname: '/identify/result',
                query: { image: img },
              })
            )}
          >
            <FontAwesomeIcon size='2xl' icon={faCamera} />
          </button>
        </div>
      </div>
    </div>
  );
}
