'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { PackSize } from '@/models/packSize';

export const columns: ColumnDef<PackSize>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'unitOfMeasure',
    header: 'Unit of Measure',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'abbreviation',
    header: 'Aescription',
  },
  {
    accessorKey: 'min',
    header: 'Min',
  },
  {
    accessorKey: 'max',
    header: 'Max',
  },
  {
    accessorKey: 'packStyleId',
    header: 'Pack Style Id',
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
