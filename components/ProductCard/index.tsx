import { FC, Dispatch, Fragment, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderModal } from '../OrderModal';

export enum ProductCardMode {
  PRESENTATIONAL = 'PRESENTATIONAL',
  FILTERED = 'FILTERED',
  READY_TO_PURCHASE = 'READY_TO_PURCHASE',
}

interface ProductCardProps {
  showPriceLabel?: boolean;
  mode?: ProductCardMode;
  onSelectItem: Dispatch<void>;
}

const ProductCard: FC<ProductCardProps> = ({
  mode = ProductCardMode.PRESENTATIONAL,
  showPriceLabel = false,
  onSelectItem,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = (val: boolean) => {
    setOpenModal(val);
    console.log(val);
  };
  return (
    <section className="bg-white border border-stone-300 w-full cursor-pointer">
      <div
        className={cn('pt-10 w-full px-10 flex flex-col items-center gap-y-2', showPriceLabel ? 'py-0' : 'py-10')}
        onClick={() => onSelectItem()}
      >
        <Image src="/products/apple_granny_255x235.png" alt="Apple Granny" width={235} height={235} />
        {mode !== ProductCardMode.PRESENTATIONAL && (
          <div className="w-full flex flex-row justify-center">
            <Image src="/cart.png" alt="Cart Image" width={50} height={50} />
          </div>
        )}
        <p className="text-stone-400 font-semibold text-xl">Apple</p>

        {mode !== ProductCardMode.PRESENTATIONAL && (
          <Fragment key="detailedProduct">
            <p className="text-stone-400 font-semibold">Granny Smith</p>
            <p className="text-stone-400 font-semibold">Organic</p>
            <p className="text-stone-400 font-semibold">Quantity: 100</p>
          </Fragment>
        )}

        {showPriceLabel && (
          <>
            <div
              className="flex flex-row  justify-center w-full min-h-0"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div className="py-5 flex flex-row items-center pl-2">
                <span className="text-marketplace font-semibold text-lg hover:underline ">See Price</span>
                <ChevronRight className="text-marketplace" />
              </div>
            </div>
            <OrderModal openModal={openModal} onOpenModal={onOpenModal} />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
