'use client';

import { FC, FormEvent, useState } from 'react';
import { QuickSearchBrand } from './QuickSearchBrand';
import { Separator } from '@/components/ui/separator';
import { AdvancedFilterBrand } from './AdvancedFilterBrand';
import { Button } from '@/components/ui/button';
import { SearchBrandValidationError } from '../lib/filterBrandSchema';

const BrandFilters: FC = () => {
  const [deliverDate, setDeliverDate] = useState<Date>();
  const [searchError, setSearchError] = useState<SearchBrandValidationError>({});
  const searchBrandsHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (deliverDate) {
      formData.set('deliverDate', deliverDate.toISOString());
    }

    const jsonData: { [key: string]: FormDataEntryValue | null } = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    jsonData.quantity = jsonData?.quantity && jsonData.quantity?.length > 0 ? jsonData.quantity : null;

    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataResponse = (await response.json()) as SearchBrandValidationError;
    if (response.status === 400) {
      setSearchError(dataResponse);
    } else {
      setSearchError({});
    }
  };

  return (
    <section className="w-full px-4">
      <form onSubmit={searchBrandsHandler}>
        <div className="flex flex-col gap-y-6">
          <div className="border border-stone-300 bg-[#f7f7f7] flex flex-col py-5 px-5">
            <h2 className="uppercase text-stone-400 font-bold">Quick Search</h2>
            <Separator className="my-3" orientation="horizontal" />

            <QuickSearchBrand deliverDate={deliverDate} updateDeliverDate={setDeliverDate} searchError={searchError} />
            <Button className="mt-10" type="submit">
              Search
            </Button>
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
