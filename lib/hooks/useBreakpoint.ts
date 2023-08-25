import { useMediaQuery } from 'react-responsive';
import tailwindConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

export enum Breakpoints {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  DOUBLE_XL = '2xl',
}

let BREAKPOINTS_SIZE = {
  [Breakpoints.SM]: '640px',
  [Breakpoints.MD]: '768px',
  [Breakpoints.LG]: '1024px',
  [Breakpoints.XL]: '1280px',
  [Breakpoints.DOUBLE_XL]: '1536px',
};

type BreakpointsSize = typeof BREAKPOINTS_SIZE;

if (fullConfig?.theme?.screens) {
  if (!Array.isArray(fullConfig?.theme?.screens)) {
    BREAKPOINTS_SIZE = fullConfig?.theme?.screens as BreakpointsSize;
  }
}

export default function useBreakpoint(breakpointKey: Breakpoints) {
  const bool = useMediaQuery({
    query: `(min-width: ${BREAKPOINTS_SIZE[breakpointKey]})`,
  });
  const capitalizedKey = (breakpointKey[0] as string).toUpperCase() + (breakpointKey as string).substring(1);
  type Key = `is${Capitalize<Breakpoints>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
