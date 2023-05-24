import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

export default function Images() {
  const router = useRouter();
  const { image: image, topic: topic } = router.query;
  const hiddenFileInput = useRef<any>(null);
  const [images, setImages] = useState([image]);
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);
  const URL =
    topic === 'plants'
      ? 'https://api.plant.id/v2/identify'
      : topic === 'mushrooms'
      ? 'https://mushroom.mlapi.ai/api/v1/identification?details=common_names,url'
      : 'https://insect.mlapi.ai/api/v1/identification?details=common_names,url';

  const data =
    topic !== 'plants'
      ? {
          images,
          modifiers: ['similar_images'],
        }
      : {
          images,
          modifiers: ['crops_fast', 'similar_images'],
          plant_details: [
            'common_names',
            'url',
            'name_authority',
            'wiki_description',
            'taxonomy',
            'synonyms',
          ],
        };

  const apiKey =
    topic === 'plants'
      ? process.env.NEXT_PUBLIC_PLANT_API_KEY
      : topic === 'mushrooms'
      ? process.env.NEXT_PUBLIC_MUSHROOM_API_KEY
      : process.env.NEXT_PUBLIC_INSECT_API_KEY;

  const headers = {
    'Content-Type': 'application/json',
    'Api-Key': apiKey,
    // 'Access-Control-Allow-Origin': 'Content-Type'
  };

  const handleChange = (event: any) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      if (images.includes(event.target?.result as string)) return;
      setImages([...images, event.target?.result as string]);
    };

    reader.readAsDataURL(file);
  };

  const Identify = () => {
    axios
      .post(URL, JSON.stringify(data), { headers })
      .then((res) => {
        console.log('Success:', res.data);
        setResponse(res.data);
        // res.data.is_plant === false ? setError(true) : setError(false);
        !error &&
          router.replace(
            {
              pathname: '/identify/result',
              query: { response: JSON.stringify(res.data.suggestions) },
            },
            '/identify/result'
          );
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  return (
    <div className='flex p-1 flex-col w-full justify-center items-center my-4'>
      <h1 className='mb-4 font-semibold text-xl'>Uploads</h1>
      {images ? (
        <div className='relative h-full w-full grid grid-cols-2 auto-cols-min gap-1'>
          {images.map((image, i) => {
            return (
              <div key={i} className='h-56 w-auto relative'>
                <Image
                  src={image as string}
                  alt='image'
                  object-fit='cover'
                  fill={true}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='relative h-full w-full'>
          <div className='h-96 relative w-full'>
            <Image
              src={image as string}
              alt='image'
              object-fit='cover'
              fill={true}
            />
          </div>
        </div>
      )}
      <div className='h-full w-full grid grid-cols-2 gap-1'>
        <input
          type='file'
          ref={hiddenFileInput}
          accept='image/*'
          onChange={handleChange}
          hidden
          multiple
          id='upload'
        />

        <label
          className='text-white h-12 flex items-center justify-center bg-yellow-600 my-2 rounded-md'
          htmlFor='upload'
        >
          <p className='text-lg font-medium'>+ Add </p>
        </label>
        <label
          className='text-white cursor-pointer h-12 flex items-center justify-center bg-red-800 my-2 rounded-md'
          onClick={() => Identify()}
        >
          <p className='text-lg font-medium'>Identify </p>
        </label>
      </div>
    </div>
  );
}
