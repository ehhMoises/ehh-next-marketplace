'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from '@/models/shopping-cart';
import { format } from 'date-fns';
import numbro from 'numbro';

const configFormatPrice: numbro.Format = {
  thousandSeparated: true,
  mantissa: 2,
};

const formatPrice = (value: number) => {
  const price = numbro(value).format(configFormatPrice);

  return `$${price}`;
};

const columnHelper = createColumnHelper<ShoppingCart>();

export const getColumns = ({
  onRemoveItemFromCart,
}: {
  onRemoveItemFromCart: (itemId: string) => void;
}): ColumnDef<ShoppingCart>[] => [
  columnHelper.group({
    id: 'checkout-column',
    header: () => null,
    footer: (props) => (
      <div className="flex flex-row justify-end w-ful gap-x-24 pr-8 my-3.5">
        <p className="text-stone-600 text-lg">Total</p>
        <p className="text-stone-600 text-lg">$9,100.00</p>
      </div>
    ),
    columns: [
      {
        accessorKey: 'deliveryDateUtc',
        header: 'Transaction Number',
        cell: ({ row }) => {
          return <div className="uppercase">{row.original.id.split('-')[4]}</div>;
        },
      },
      {
        header: 'Product Description and Grower',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <h4 className="font-bold text-md">{row.original.stock.header}</h4>

              <div>
                <p>{row.original.stock.subHeader}</p>
              </div>

              <div>
                <p className="font-bold text-gray-500">{row.original.stock.account.name}</p>
              </div>
            </div>
          );
        },
      },
      {
        header: 'Deliver Date',
        cell: ({ row }) => {
          return <div>{format(new Date(row.original.deliveryDateUtc), 'PPP')}</div>;
        },
      },
      {
        header: 'Quantity',
        cell: ({ row }) => {
          return <div>{row.original.quantity}</div>;
        },
      },
      {
        header: 'Price',
        cell: ({ row }) => {
          return <div>{formatPrice(row.original.stock.standardPrice)}</div>;
        },
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
          return (
            <div>
              ${numbro(row.original.stock.standardPrice).multiply(row.original.quantity).format(configFormatPrice)}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cell: ({ row }) => {
          return (
            <Button variant="ghost" onClick={onRemoveItemFromCart.bind(null, row.original.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          );
        },
      },
    ],
  }),
];
