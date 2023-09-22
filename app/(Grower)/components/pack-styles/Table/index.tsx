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
import { useGetPackStyleQuery } from '@/app/(Grower)/hooks/queries/usePackStyle';
import { PackStyle } from '@/models/packStyle';

export const PackStyleTable: FC = () => {
  const { data: packStyles, isLoading: isLoadingPackStyles, isError } = useGetPackStyleQuery({});
  const router = useRouter();

  const columns: ColumnDef<PackStyle>[] = [
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
            router.push(`/grower/pack-styles/${row.getValue('id')}`);
          }}
        >
          <FontAwesomeIcon icon={faPen} size="xl" className="text-stone-500 hover:text-stone-400 transition-colors" />
        </Button>
      ),
    },
  ];

  if (isLoadingPackStyles) {
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
          <AlertDescription>There was an error loading Pack Styles, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push('/grower/pack-styles/new')}>Create</Button>
      </div>

      <div>
        <div className="bg-marketplace p-4 text-white">Pack Style Table</div>
        <DataTable columns={columns} data={packStyles || []} />
      </div>
    </div>
  );
};
