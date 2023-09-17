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
import { format } from 'date-fns';
import numbro from 'numbro';

const configFormatPrice: numbro.Format = {
  thousandSeparated: true,
  mantissa: 2,
};

export const StockTable: FC = () => {
  const { data: catalogs, isLoading: isLoadingCatalogs, isError } = useGetCatalgsQuery({});
  const router = useRouter();

  const columns: ColumnDef<StockCatalog>[] = [
    {
      header: 'Overview',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <h4 className="font-bold text-md text-stone-700">{row.original.header}</h4>

            <div>
              <p>{row.original.subHeader}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Start Date',
      cell: ({ row }) => <div>{format(new Date(row.original.startDate), 'PPP')}</div>,
    },
    {
      header: 'End Date',
      cell: ({ row }) => <div>{format(new Date(row.original.endDate), 'PPP')}</div>,
    },
    {
      header: 'Min Price',
      cell: ({ row }) => <div>${numbro(row.original.minPrice).format(configFormatPrice)}</div>,
    },
    {
      header: 'Reserved Quantity',
      cell: ({ row }) => <div>{row.original.reservedQuantity}</div>,
    },
    {
      header: 'Total Quantity',
      cell: ({ row }) => <div>${numbro(row.original.totalQuantity).format(configFormatPrice)}</div>,
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
    <div className="p-4 pt-0">
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push('/grower/catalog/new')}>Create</Button>
      </div>

      <div>
        <div className="bg-orange-500 p-4 text-white">Product Catalog</div>
        <DataTable columns={columns} data={catalogs || []} />
      </div>
    </div>
  );
};
