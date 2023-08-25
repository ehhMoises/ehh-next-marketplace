'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IMyOrdersTable = {
  transactionNumber: string;
  deliverDate: string | Date | null;
  status: string;
};

export const columns: ColumnDef<IMyOrdersTable>[] = [
  {
    accessorKey: 'transactionNumber',
    header: 'Transaction Number',
  },
  {
    accessorKey: 'deliverDate',
    header: 'Deliver Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
