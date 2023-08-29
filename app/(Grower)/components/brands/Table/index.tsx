'use client';

import { FC } from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ProductCatalogData } from './data';
import { useGetBrandsQuery } from '@/app/(Grower)/hooks/queries/useBrandsQuery';

export const BrandTable: FC = () => {
  const { data: brands, isLoading: isLoadingBrands, isError, error } = useGetBrandsQuery({});
  console.log('Brands', brands);
  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Brand Table</div>
      <DataTable columns={columns} data={ProductCatalogData} />
    </div>
  );
};
