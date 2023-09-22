'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FC } from 'react';

export const NavigationMenuRetailer: FC = () => {
  const pathname = usePathname();
  return (
    <div className="w-full bg-stone-900 text-white flex mb-4 border-b-2 border-b-white">
      <Link
        href="/retailer/home"
        className={cn(
          'transition-colors',
          pathname === '/retailer/home' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Home
      </Link>
      <Link
        href="/retailer/orders"
        className={cn(
          'transition-colors',
          pathname === '/retailer/orders' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Orders
      </Link>
      <Link
        href="/retailer/profile"
        className={cn(
          'transition-colors',
          pathname === '/retailer/profile' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Profile
      </Link>
    </div>
  );
};
