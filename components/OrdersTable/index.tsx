'use client';

import { FC, useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGetOrdersQuery } from '@/app/(Grower)/hooks/queries/useOrdersQuery';
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
import { usePathname, useRouter } from 'next/navigation';
import { OrderStatusLabels, PurchaseOrderList } from '@/models/purchase-order';

export const MyOrdersTable: FC = () => {
  const { data, isLoading, isError } = useGetOrdersQuery({});
  const [dataSource, setDataSource] = useState<PurchaseOrderList[]>([]);
  const [currentRootPath, setCurrentRootPath] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      if (pathname === '/grower/home') {
        setCurrentRootPath('/grower/orders');
      }
      if (pathname === '/retailer/home') {
        setCurrentRootPath('/retailer/orders');
      }
      if (pathname === '/grower/orders') {
        setCurrentRootPath('/grower/orders');
      }
      if (pathname === '/retailer/orders') {
        setCurrentRootPath('/retailer/orders');
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (data && data.data && data.data.length) {
      if (pathname === '/grower/home' || pathname === '/retailer/home') {
        setDataSource(data.data.slice(0, 5));
      } else {
        setDataSource(data.data);
      }
    }
  }, [data, pathname]);

  const columns: ColumnDef<PurchaseOrderList>[] = [
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
      cell: ({ row }) => <div>{format(new Date(row.original.deliveryDateUtc), 'PPP')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="py-1 px-4 w-full flex justify-center uppercase">
            {OrderStatusLabels[row.original.status.name]}
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
            router.push(`${currentRootPath}/${row.getValue('id')}`);
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
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Orders Table, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Accordion type="single" typeof="single" className="mt-4" defaultValue="orders-table-item" collapsible>
      <AccordionItem value="orders-table-item">
        <AccordionTrigger className="bg-marketplace p-4 text-white">My Orders Table</AccordionTrigger>
        <AccordionContent>
          <DataTable columns={columns} data={dataSource} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
