'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ICheckout = {
  transactionNumber: string;
  productDescriptionAndGrower: string;
  deliverDate: string | Date | null;
  quantity: number;
  price: number;
  total: number;
};

export const columns: ColumnDef<ICheckout>[] = [
  {
    accessorKey: 'transactionNumber',
    header: 'Transaction Number',
  },
  {
    accessorKey: 'productDescriptionAndGrower',
    header: 'Product Description and Grower',
  },
  {
    accessorKey: 'deliverDate',
    header: 'Deliver Date',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <Button variant="ghost">
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
        </Button>
      );
    },
  },
];
