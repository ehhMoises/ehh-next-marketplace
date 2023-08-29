'use client';

import { Brand } from '@/models/brand';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Brand>[] = [
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
    accessorKey: 'commodity',
    header: 'Commodity',
  },
  {
    accessorKey: 'variety',
    header: 'Variety',
  },
  {
    accessorKey: 'subVariety',
    header: 'Sub Variety',
  },
  {
    accessorKey: 'plu',
    header: 'Plu',
  },
  {
    accessorKey: 'growingMethod',
    header: 'Growing Method',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`text-white py-1 px-4 w-full flex justify-center ${
          row.getValue('isActive') ? 'bg-green-500' : 'bg-gray-500'
        }`}
      >
        {row.getValue('isActive') ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
];
