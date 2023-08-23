'use client';

import Link from 'next/link';
import { FC } from 'react';

export const NavigationMenuRetailer: FC = () => {
  return (
    <div className="w-full bg-gray-800 text-white flex mb-4">
      <Link href="/retailer" className="py-4 px-8 hover:bg-black">
        Home
      </Link>
      <Link href="/retailer/orders" className="py-4 px-8 hover:bg-black">
        Orders
      </Link>
      <Link href="/" className="py-4 px-8 hover:bg-black">
        Growers
      </Link>
      <Link href="/" className="py-4 px-8 hover:bg-black">
        Carriers
      </Link>
    </div>
  );
};
