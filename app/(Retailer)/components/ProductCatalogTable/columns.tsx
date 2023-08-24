'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IProductCatalogTable = {
  itemDescription: string;
  stockAvailable: number;
  safeStock: number;
  startDate: Date | string | null;
  endDate: Date | string | null;
  casePrice: number;
};

export const columns: ColumnDef<IProductCatalogTable>[] = [
  {
    accessorKey: 'itemDescription',
    header: 'Item Description',
  },
  {
    accessorKey: 'stockAvailable',
    header: 'Stock Available',
  },
  {
    accessorKey: 'safeStock',
    header: 'Safe Stock',
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
    accessorKey: 'casePrice',
    header: 'Case Price',
  },
];
