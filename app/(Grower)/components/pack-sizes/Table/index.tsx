'use client';

import { FC } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useGetPackSizesQuery } from '@/app/(Grower)/hooks/queries/usePackSize';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { PackSize } from '@/models/packSize';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const PackSizeTable: FC = () => {
  const { data: packSizes, isLoading: isLoadingPackSizes, isError } = useGetPackSizesQuery({});
  const router = useRouter();

  const columns: ColumnDef<PackSize>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'unitOfMeasure',
      header: 'Unit of Measure',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'abbreviation',
      header: 'Aescription',
    },
    {
      accessorKey: 'min',
      header: 'Min',
    },
    {
      accessorKey: 'max',
      header: 'Max',
    },
    {
      accessorKey: 'packStyleId',
      header: 'Pack Style Id',
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`text-white py-1 px-4 flex justify-center ${
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

  if (isLoadingPackSizes) {
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
    <div>
      <div className="bg-orange-500 p-4 text-white">Pack Size Table</div>
      <DataTable columns={columns} data={packSizes || []} />
    </div>
  );
};
