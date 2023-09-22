'use client';

import { FC } from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ProductCatalogData } from './data';

export const ProductCatalogTable: FC = () => {
  return (
    <div>
      <div className="bg-marketplace p-4 text-white">Product Catalog Table</div>
      <DataTable columns={columns} data={ProductCatalogData} />
    </div>
  );
};
