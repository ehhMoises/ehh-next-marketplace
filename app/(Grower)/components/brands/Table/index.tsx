'use client';

import { FC } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useGetBrandsQuery } from '@/app/(Grower)/hooks/queries/useBrandsQuery';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Brand } from '@/models/brand';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GrowingMethod } from '@/models/growingMethod';

export const BrandTable: FC = () => {
  const { data: brands, isLoading: isLoadingBrands, isError } = useGetBrandsQuery({});

  const router = useRouter();

  const columns: ColumnDef<Brand<GrowingMethod>>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'commodity',
      header: 'Commodity',
    },
    {
      accessorKey: 'variety',
      header: 'Variety',
    },
    {
      accessorKey: 'subVariety',
      header: 'Sub Variety',
    },
    {
      accessorKey: 'plu',
      header: 'Plu',
    },
    {
      accessorKey: 'growingMethod.name',
      header: 'Growing Method',
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`text-white py-1 px-4 w-full flex justify-center ${
            row.getValue('isActive') ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          {row.getValue('isActive') ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'action',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          type="button"
          variant="ghost"
          title="Edit"
          onClick={() => {
            router.push(`/grower/brands/${row.getValue('id')}`);
          }}
        >
          <FontAwesomeIcon icon={faPen} size="xl" className="text-stone-500 hover:text-stone-400 transition-colors" />
        </Button>
      ),
    },
  ];

  if (isLoadingBrands) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Brands, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push('/grower/brands/new')}>Create</Button>
      </div>

      <div>
        <div className="bg-orange-500 p-4 text-white">Brand Table</div>
        <DataTable columns={columns} data={brands?.data || []} />
      </div>
    </div>
  );
};
