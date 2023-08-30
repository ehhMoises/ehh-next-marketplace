import React, { CSSProperties, FC } from 'react';
import { AwesomeLoaderSize } from '../loader-size.constant';
import classes from './SpinClockwise.module.css';
import { cn } from '@/lib/utils';

interface SpinClockwiseLoaderProps {
  loaderSize?: AwesomeLoaderSize | null;
  color?: string;
}

const SpinClockwiseLoader: FC<SpinClockwiseLoaderProps> = ({ loaderSize, color }) => {
  const factorLoaderSize = 4;
  const size = loaderSize ?? AwesomeLoaderSize.XLARGE;
  const innerLoaderSize = size / factorLoaderSize;

  const innerStyles: CSSProperties = {
    width: `${innerLoaderSize.toString()}px`,
    height: `${innerLoaderSize.toString()}px`,
    marginTop: '-12px',
    marginLeft: '-12px',
  };

  return (
    <div
      className={cn([classes['la-ball-spin-clockwise']])}
      style={{
        color: color ?? 'red',
        width: `${loaderSize}px`,
        height: `${loaderSize}px`,
      }}
    >
      {Array.from(Array(8).keys()).map((d) => (
        <div key={d.toString()} style={innerStyles} />
      ))}
    </div>
  );
};

export { SpinClockwiseLoader };
