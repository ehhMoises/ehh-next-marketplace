'use client';
import { useEffect, useState } from 'react';

export const useTimeIntermediate = (isLoading: boolean) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(
        () =>
          setTime((prevTime) => {
            if (prevTime === 100) {
              return 0;
            }

            return prevTime + 1;
          }),
        50
      );
      return () => {
        clearInterval(interval);
      };
    }
  }, [isLoading]);

  return time;
};
