'use client';

import { FC, Dispatch, Fragment, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderModal } from '../OrderModal';
import { ProductCardMode } from '@/lib/constant/ui';

interface ProductCardProps {
  mode?: ProductCardMode;
  onSelectItem?: Dispatch<void>;
}

const ProductCard: FC<ProductCardProps> = ({
  mode = ProductCardMode.PRESENTATIONAL,

  onSelectItem,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = (val: boolean) => {
    setOpenModal(val);
    console.log(val);
  };
  return (
    <section
      className={cn(
        'bg-white border border-stone-300 w-full',
        mode !== ProductCardMode.PRESENTATIONAL && mode === ProductCardMode.ON_FILTER ? 'cursor-pointer' : 'cursor-auto'
      )}
    >
      <div
        className={cn(
          'pt-10 w-full px-10 flex flex-col items-center gap-y-2',
          mode === ProductCardMode.FILTERED ? 'py-5' : 'py-10'
        )}
        onClick={() => {
          if (mode !== ProductCardMode.PRESENTATIONAL && onSelectItem) {
            onSelectItem();
          }
        }}
      >
        <Image src="/products/apple_granny_255x235.png" alt="Apple Granny" width={235} height={235} />
        {mode !== ProductCardMode.PRESENTATIONAL && (
          <div className="w-full flex flex-row justify-center">
            <Image src="/cart.png" alt="Cart Image" width={50} height={50} />
          </div>
        )}
        <p className="text-stone-400 font-semibold text-xl">Apple</p>

        {mode === ProductCardMode.ON_FILTER && (
          <Fragment key="onFilterDetailedProduct">
            <p className="text-stone-400 font-semibold">Granny Smith</p>
            <p className="text-stone-400 font-semibold">Organic</p>
          </Fragment>
        )}

        {mode === ProductCardMode.FILTERED && (
          <Fragment key="detailedProduct">
            <p className="text-stone-400 font-semibold">Granny Smith</p>
            <p className="text-stone-400 font-semibold">Quantity: 100</p>
          </Fragment>
        )}

        {mode === ProductCardMode.FILTERED && (
          <div className="py-5">
            <div
              className="justify-center min-h-0 cursor-pointer inline"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div className="flex flex-row items-center pl-2">
                <span className="text-marketplace font-semibold text-lg hover:underline ">See Pricing</span>
                <ChevronRight className="text-marketplace" />
              </div>
            </div>
            <OrderModal openModal={openModal} onOpenModal={onOpenModal} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
