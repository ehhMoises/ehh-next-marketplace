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
export type IOrder = {
  id: string;
  grower: string;
  productDescription: string;
  deliverDate: string | Date | null;
  quantity: number;
  price: number;
  total: number;
};

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'grower',
    header: 'Grower',
    cell: ({ row }) => {
      return <Image className="w-full" src={row.original.grower} alt="Product" width="50" height="50" />;
    },
  },
  {
    accessorKey: 'productDescription',
    header: 'Product Description',
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
      // const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" /> Buy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
