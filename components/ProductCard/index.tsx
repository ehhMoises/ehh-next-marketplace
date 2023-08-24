'use client';

import { FC, Dispatch, Fragment, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderModal } from '../OrderModal';
import { ProductCardMode } from '@/lib/constant/ui';

interface ProductCardProps {
  mode?: ProductCardMode;
  onSelectItem?: Dispatch<{
    brandId: string;
    commodity: string;
    variety: string;
  }>;
  brandId: string;
  commodity: string;
  variety: string;
  organic?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  mode = ProductCardMode.PRESENTATIONAL,
  brandId,
  commodity,
  variety,
  organic,
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
        mode !== ProductCardMode.PRESENTATIONAL && mode === ProductCardMode.ON_FILTER
          ? 'cursor-pointer'
          : 'cursor-auto',
        mode === ProductCardMode.FILTERED ? 'h-[28rem]' : 'h-[23rem]'
      )}
    >
      <div
        className={cn(
          'pt-10 w-full px-10 flex flex-col items-center gap-y-2',
          mode === ProductCardMode.FILTERED ? 'py-5' : 'py-10'
        )}
        onClick={() => {
          if (mode !== ProductCardMode.PRESENTATIONAL && onSelectItem) {
            onSelectItem({
              brandId,
              commodity,
              variety,
            });
          }
        }}
      >
        <Image src="/products/apple_granny_255x235.png" alt={commodity ?? ''} width={235} height={235} />
        {!(mode === ProductCardMode.PRESENTATIONAL || mode === ProductCardMode.ON_FILTER) && (
          <div className="w-full flex flex-row justify-center">
            <Image src="/cart.png" alt="Cart Image" width={50} height={50} />
          </div>
        )}
        {commodity && <p className="text-stone-400 font-semibold text-xl">{commodity}</p>}

        {mode === ProductCardMode.ON_FILTER && (
          <Fragment key="onFilterDetailedProduct">
            <p className="text-stone-400 font-semibold">{variety}</p>
          </Fragment>
        )}

        {mode === ProductCardMode.FILTERED && (
          <Fragment key="detailedProduct">
            <p className="text-stone-400 font-semibold">{variety}</p>
            {organic && <p className="text-stone-400 font-semibold">{organic}</p>}
          </Fragment>
        )}

        {mode === ProductCardMode.FILTERED && (
          <section className="pt-1">
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
          </section>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
