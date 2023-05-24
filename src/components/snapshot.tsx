import React, { useState } from 'react';
import { Camera } from 'react-camera-pro';

interface PlantsProps {
  innerRef: React.MutableRefObject<null>;
}

const errorMessages = {
  noCameraAccessible:
    'No camera device accessible. Please connect your camera or try a different browser.',
  permissionDenied:
    'Permission denied. Please refresh and give camera permission.',
  switchCamera:
    'It is not possible to switch camera to different one because there is only one video device accessible.',
  canvas: 'Canvas is not supported.',
};

export default function SnapShot(props: PlantsProps) {
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  return (
    <div className='h-2/3 w-screen'>
      <Camera
        errorMessages={errorMessages}
        ref={props.innerRef}
        aspectRatio={'cover'}
        numberOfCamerasCallback={setNumberOfCameras} 
      />
    </div>
  );
}
