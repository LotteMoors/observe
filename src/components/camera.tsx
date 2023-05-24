
import React from 'react';
import { Camera } from 'react-camera-pro';

interface PlantsProps {
  innerRef: React.MutableRefObject<null>;
}

export default function Picture(props: PlantsProps) {
  return (
    <div className='h-2/3 w-screen'>
      <Camera ref={props.innerRef} aspectRatio={'cover'} />
    </div>
  );
}
