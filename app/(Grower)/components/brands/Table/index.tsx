'use client';

import { FC } from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ProductCatalogData } from './data';

export const BrandTable: FC = () => {
  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Brand Table</div>
      <DataTable columns={columns} data={ProductCatalogData} />
    </div>
  );
};
