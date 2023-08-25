'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FC } from 'react';

export const NavigationMenuRetailer: FC = () => {
  const pathname = usePathname();
  return (
    <div className="w-full bg-gray-800 text-white flex mb-4">
      <Link
        href="/grower/home"
        className={pathname === '/grower/home' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Home
      </Link>
      <Link
        href="/grower/catalog"
        className={pathname === '/grower/catalog' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Catalog
      </Link>
      <Link
        href="/grower/orders"
        className={pathname === '/grower/orders' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Orders
      </Link>
      <Link
        href="/grower/retailers"
        className={pathname === '/grower/retailers' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Retailers
      </Link>
      <Link
        href="/grower/carriers"
        className={pathname === '/grower/carriers' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Carriers
      </Link>
    </div>
  );
};
