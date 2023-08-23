'use client';

import { FC } from 'react';
import { columns } from './columns';
import { data } from './data';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/DataTable';

export const CheckoutTable: FC = () => {
  const router = useRouter();
  return (
    <div className="m-4">
      <div className="flex justify-end">
        <div className="mb-4">
          <Button
            className="mr-4 bg-transparent text-black"
            variant="ghost"
            onClick={() => {
              router.push('/search');
            }}
          >
            Keep Shopping
          </Button>
          <Button onClick={() => router.push('/retailer/orders')}>Save Order</Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
