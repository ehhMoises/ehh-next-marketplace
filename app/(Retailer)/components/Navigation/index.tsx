'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FC } from 'react';

export const NavigationMenuRetailer: FC = () => {
  const pathname = usePathname();
  return (
    <div className="w-full bg-gray-800 text-white flex mb-4">
      <Link
        href="/retailer/home"
        className={pathname === '/retailer/home' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Home
      </Link>
      <Link
        href="/retailer/orders"
        className={pathname === '/retailer/orders' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Orders
      </Link>
    </div>
  );
};
