import { FC } from 'react';
import { QuickSearchBrand } from './QuickSearchBrand';
import { Separator } from '@/components/ui/separator';
import { AdvancedFilterBrand } from './AdvancedFilterBrand';

const BrandFilters: FC = () => {
  return (
    <section className="w-full px-4">
      <form>
        <div className="flex flex-col gap-y-6">
          <div className="border border-stone-300 bg-[#f7f7f7] flex flex-col py-5 px-5">
            <h2 className="uppercase text-stone-400 font-bold">Quick Search</h2>
            <Separator className="my-3" orientation="horizontal" />

            <QuickSearchBrand />
          </div>

          <div className="border border-stone-300 bg-[#f7f7f7] flex flex-col py-5 px-5">
            <div className="flex flex-row justify-between">
              <h2 className="uppercase text-stone-400 font-bold">Filters</h2>
              <span className="uppercase text-stone-400 hover:text-stone-500 transition-colors cursor-pointer">
                Clear
              </span>
            </div>
            <Separator className="my-3" orientation="horizontal" />

            <AdvancedFilterBrand />
          </div>
        </div>
      </form>
    </section>
  );
};

export default BrandFilters;
