'use client';

import { FC } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useGetCatalgsQuery } from '@/app/(Grower)/hooks/queries/useStockQuery';
import { StockCatalog } from '@/models/catalog';

export const StockTable: FC = () => {
  const { data: catalogs, isLoading: isLoadingCatalogs, isError, isSuccess: isSuccessCatalog } = useGetCatalgsQuery({});

  const router = useRouter();
  const columns: ColumnDef<StockCatalog>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'header',
      header: 'Header',
    },
    {
      accessorKey: 'subHeader',
      header: 'Sub Header',
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
    },
    {
      accessorKey: 'minPrice',
      header: 'Min Price',
    },
    {
      accessorKey: 'reservedQuantity',
      header: 'Reserved Quantity',
    },
    {
      accessorKey: 'totalQuantity',
      header: 'Total Quantity',
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
            router.push(`/grower/catalog/${row.getValue('id')}`);
          }}
        >
          <FontAwesomeIcon icon={faPen} size="xl" className="text-stone-500 hover:text-stone-400 transition-colors" />
        </Button>
      ),
    },
  ];

  if (isLoadingCatalogs) {
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
          <AlertDescription>There was an error loading Catalog, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Product Catalog</div>
      <DataTable columns={columns} data={catalogs || []} />
    </div>
  );
};
