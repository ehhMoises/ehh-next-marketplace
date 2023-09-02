'use client';

import { FC } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useGetGradeQuery } from '@/app/(Grower)/hooks/queries/useGradeQuery';
import { useGetCatalgsQuery } from '@/app/(Grower)/hooks/queries/useStockQuery';

export const StockTable: FC = () => {
  const { data: catalogs, isLoading: isLoadingCatalogs, isError } = useGetCatalgsQuery({});

  console.log('catalogs', catalogs);
  const router = useRouter();

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
      {/* <DataTable columns={columns} data={catalogs || []} /> */}
    </div>
  );
};
