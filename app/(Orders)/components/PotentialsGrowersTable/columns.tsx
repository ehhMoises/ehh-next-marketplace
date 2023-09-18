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

interface ColumnsCheckoutDef {
  addStockToCartHandler: (stockId: string, shipToLocation: string) => void;
  removeCartItemHandler: (stockId: string, cartItemId: string) => void;
}

export const getColumns = ({
  addStockToCartHandler,
  removeCartItemHandler,
}: ColumnsCheckoutDef): ColumnDef<PotentialGrowers>[] => [
  {
    header: 'Grower',
    cell: ({ row }) => {
      const logoGrower = row.original.account.logoUrl?.length ? row.original.account.logoUrl : '/only-logo-neutral.png';

      return <Image className="w-full" src={logoGrower} alt="Product" width="50" height="50" />;
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
    header: 'Ship To Location',
    cell: ({ row }) => {
      const splittedAddress = row.original.shipToLocation.split(',');
      return (
        <div className="w-full xl:w-80">
          <p className="text-stone-500 text-md font-bold">{splittedAddress[0]}</p>
          <p>{splittedAddress[1]}</p>
        </div>
      );
    },
  },
  {
    header: 'Deliver Date',
    cell: ({ row }) => (
      <div>
        <p className="text-stone-500 text-md">{format(new Date(row.original.startDate), 'PPP')}</p>
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
            <Button
              className="w-10 h-10 rounded-sm"
              variant={'ghost'}
              onClick={addStockToCartHandler.bind(null, row.original.id, row.original.shipToLocation)}
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                size={'2x'}
                className="text-stone-500 hover:text-stone-400 transition-colors"
              />
            </Button>
          )}
          {row.original.isUnderCart && row.original.cartItemId && (
            <Button
              className="w-10 h-10 rounded-sm"
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
