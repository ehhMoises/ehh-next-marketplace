'use client';

import { StockCatalog } from '@/models/catalog';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<StockCatalog>[] = [
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
];
