'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import numbro from 'numbro';
import Image from 'next/image';
import { PotentialGrowers } from '@/models/targetSellers';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const formatPotentialGrowersPrice = (value: number) => {
  const price = numbro(value).format({
    thousandSeparated: true,
    mantissa: 2,
  });

  return `$${price}`;
};

export const getColumns = ({
  addStockToCartHandler,
  removeCartItemHandler,
}: {
  addStockToCartHandler: (stockId: string) => void;
  removeCartItemHandler: (stockId: string, cartItemId: string) => void;
}): ColumnDef<PotentialGrowers>[] => [
  {
    header: 'Grower',
    cell: () => {
      return (
        <Image className="w-full" src={'/products/apple_granny_255x235.png'} alt="Product" width="50" height="50" />
      );
    },
  },
  {
    header: 'Product Description',
    cell: ({ row }) => (
      <div className="flex flex-col text-stone-500">
        <p className="font-bold capitalize text-[1rem]">{row.original.product.brand.commodity}</p>
        <p className="text-md">
          {row.original.product.brand.variety},{row.original.product.brand.subVariety}
        </p>
        <p className="text-md">
          {row.original.product.packSize.name}, {row.original.product.packStyle.name}
        </p>
        <p className="text-md">{row.original.product.grade.name}</p>
      </div>
    ),
  },
  {
    header: 'Deliver Date',
    cell: ({ row }) => (
      <div>
        <p className="text-stone-500 text-md">{format(new Date(row.original.startDate), 'MM/dd/yyyy')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => (
      <div>
        <p className="text-stone-500 text-md">{formatPotentialGrowersPrice(row.original.availableQuantity)}</p>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price / Case',
    cell: ({ row }) => (
      <div>
        <p className="text-stone-500 text-md">{formatPotentialGrowersPrice(row.original.standardPrice)}</p>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Total',
    cell: ({ row }) => {
      const total = row.original.availableQuantity * row.original.standardPrice;

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center">
            <p className="text-stone-500 text-md">{formatPotentialGrowersPrice(total)}</p>
          </div>
          {!row.original.isUnderCart && (
            <Button className="w-10 h-10" variant={'ghost'} onClick={addStockToCartHandler.bind(null, row.original.id)}>
              <FontAwesomeIcon
                icon={faCartShopping}
                size={'2x'}
                className="text-stone-500 hover:text-stone-400 transition-colors"
              />
            </Button>
          )}
          {row.original.isUnderCart && row.original.cartItemId && (
            <Button
              className="w-10 h-10"
              variant={'link'}
              onClick={removeCartItemHandler.bind(null, row.original.id, row.original.cartItemId)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size={'2x'}
                className="text-stone-500 hover:text-stone-400 transition-colors"
              />
            </Button>
          )}
        </div>
      );
    },
  },
];
