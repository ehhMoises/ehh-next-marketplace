'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationGrower: FC = () => {
  const pathname = usePathname();
  return (
    <div className="w-full bg-stone-900 text-white flex mb-4">
      <Link
        href="/grower/home"
        className={pathname === '/grower/home' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Home
      </Link>
      <Link
        href="/grower/brands"
        className={pathname === '/grower/brands' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Brands
      </Link>
      <Link
        href="/grower/pack-styles"
        className={pathname === '/grower/pack-styles' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Pack Styles
      </Link>
      <Link
        href="/grower/pack-sizes"
        className={pathname === '/grower/pack-sizes' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Pack Sizes
      </Link>
      <Link
        href="/grower/grades"
        className={pathname === '/grower/grades' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Grades
      </Link>
      <Link
        href="/grower/catalog"
        className={pathname === '/grower/catalog' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Catalog
      </Link>

      <Link
        href="/grower/profile"
        className={pathname === '/grower/profile' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Profile
      </Link>
      {/* <Link
        href="/grower/orders"
        className={pathname === '/grower/order' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Orders
      </Link> */}
      {/* <Link
        href="/grower/retailer"
        className={pathname === '/grower/retailer' ? 'py-3.5 px-8 bg-stone-700' : 'py-3.5 px-8 hover:bg-gray-700'}
      >
        Retailer
      </Link> */}
    </div>
  );
};
