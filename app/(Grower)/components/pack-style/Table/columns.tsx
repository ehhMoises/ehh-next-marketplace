'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { PackStyle } from '@/models/packStyle';

export const columns: ColumnDef<PackStyle>[] = [
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
];
