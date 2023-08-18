import Image from 'next/image';
import { FC } from 'react';

export const HeroComponent: FC = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="w-full">
        <Image className="w-full" src="/fruits/cherry.jpg" alt="eHarvestHub Logo" width="800" height="400" />
      </div>
    </div>
  );
};
