'use client';

import { FC } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGetOrdersQuery } from '@/app/(Grower)/hooks/queries/ordersQuery';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../ui/button';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { IMyOrdersTable } from '@/models/orders';
import { useRouter } from 'next/navigation';

export const MyOrdersTable: FC = () => {
  const { data, isLoading, isError } = useGetOrdersQuery({});

  const router = useRouter();

  const columns: ColumnDef<IMyOrdersTable>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'transactionNumber',
      header: 'Transaction Number',
    },
    {
      accessorKey: 'deliveryDateUtc',
      header: 'Deliver Date',
      cell: ({ row }) => <div>{format(new Date(row.getValue('deliveryDateUtc')), 'PPP')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        console.log('Row', row);
        return (
          <Badge variant="outline" className={`py-1 px-4 w-full flex justify-center `}>
            {row.original.status.name}
          </Badge>
        );
      },
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
            router.push(`/orders/${row.getValue('id')}`);
          }}
        >
          <FontAwesomeIcon icon={faPen} size="xl" className="text-stone-500 hover:text-stone-400 transition-colors" />
        </Button>
      ),
    },
  ];

  if (isLoading) {
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
          <AlertDescription>There was an error loading Dashboard, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-orange-500 p-4 text-white">My Orders Table</AccordionTrigger>
        <AccordionContent>
          <DataTable columns={columns} data={data.data} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
