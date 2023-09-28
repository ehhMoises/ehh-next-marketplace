'use client';

import { FC, useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetUsersQuery } from '@/app/(Grower)/hooks/queries/useUsersQuery';
import { IUser } from '@/models/users';
import { IEnum } from '@/models/enum';

export const UsersTable: FC = () => {
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery({});
  const [, setCurrentRootPath] = useState('');

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

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'accountId',
      header: 'Account Id',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'position',
      header: 'Position',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className={`py-1 px-4 w-full flex justify-center `}>
            {(row.original.status as IEnum).name}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className={`py-1 px-4 w-full flex justify-center `}>
            {(row.original.type as IEnum).name}
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
            router.push(`/users/home/${row.getValue('id')}`);
          }}
        >
          <FontAwesomeIcon icon={faPen} size="xl" className="text-stone-500 hover:text-stone-400 transition-colors" />
        </Button>
      ),
    },
  ];

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorUsers) {
    return (
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Users Table, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push('/users/home/new')}>Create</Button>
      </div>
      <Accordion type="single" typeof="single" className="mt-4" defaultValue="users-table-item" collapsible>
        <AccordionItem value="users-table-item">
          <AccordionTrigger className="bg-marketplace p-4 text-white">Users</AccordionTrigger>
          <AccordionContent>
            <DataTable columns={columns} data={users.data} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
