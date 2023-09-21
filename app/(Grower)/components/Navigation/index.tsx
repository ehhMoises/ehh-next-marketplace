'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const NavigationGrower: FC = () => {
  const pathname = usePathname();
  return (
    <div className="w-full bg-stone-900 text-white flex mb-4 border-b-2 border-b-white">
      <Link
        href="/grower/home"
        className={cn(
          'transition-colors',
          pathname === '/grower/home' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Home
      </Link>

      <Link
        href="/grower/brands"
        className={cn(
          'transition-colors',
          pathname === '/grower/brands' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Brands
      </Link>

      <Link
        href="/grower/pack-styles"
        className={cn(
          'transition-colors',
          pathname === '/grower/pack-styles' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Pack Styles
      </Link>

      <Link
        href="/grower/pack-sizes"
        className={cn(
          'transition-colors',
          pathname === '/grower/pack-sizes' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Pack Sizes
      </Link>

      <Link
        href="/grower/catalog"
        className={cn(
          'transition-colors',
          pathname === '/grower/catalog' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Catalog
      </Link>

      <Link
        href="/grower/profile"
        className={cn(
          'transition-colors',
          pathname === '/grower/profile' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Profile
      </Link>

      <Link
        href="/grower/orders"
        className={cn(
          'transition-colors',
          pathname === '/grower/orders' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Orders
      </Link>

      <Link
        href="/users/home"
        className={cn(
          'transition-colors',
          pathname === '/users/home' ? 'py-3.5 px-8 bg-white text-stone-900' : 'py-3.5 px-8 hover:bg-stone-500'
        )}
      >
        Users
      </Link>
    </div>
  );
};
