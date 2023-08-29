'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FC } from 'react';

export const NavigationGrower: FC = () => {
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
        href="/grower/brands"
        className={pathname === '/grower/brands' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Brands
      </Link>
      <Link
        href="/grower/pack-styles"
        className={pathname === '/grower/pack-styles' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Pack Styles
      </Link>
      <Link
        href="/grower/pack-sizes"
        className={pathname === '/grower/pack-sizes' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Pack Sizes
      </Link>
      <Link
        href="/grower/grades"
        className={pathname === '/grower/grades' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Grades
      </Link>
      <Link
        href="/grower/catalog"
        className={pathname === '/grower/catalog' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Catalog
      </Link>
      {/* <Link
        href="/grower/orders"
        className={pathname === '/grower/order' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Orders
      </Link> */}
      {/* <Link
        href="/grower/retailer"
        className={pathname === '/grower/retailer' ? 'py-4 px-8 bg-black' : 'py-4 px-8 hover:bg-gray-700'}
      >
        Retailer
      </Link> */}
    </div>
  );
};
