import { FC, FormEvent } from 'react';
import { QuickSearchBrand } from './QuickSearchBrand';
import { Separator } from '@/components/ui/separator';
import { AdvancedFilterBrand } from './AdvancedFilterBrand';
import { Button } from '@/components/ui/button';

const BrandFilters: FC = () => {
  const searchBrandsHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const jsonData: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataResponse = await response.json();
    console.log(dataResponse);
  };

  return (
    <section className="w-full px-4">
      <form onSubmit={searchBrandsHandler}>
        <div className="flex flex-col gap-y-6">
          <div className="border border-stone-300 bg-[#f7f7f7] flex flex-col py-5 px-5">
            <h2 className="uppercase text-stone-400 font-bold">Quick Search</h2>
            <Separator className="my-3" orientation="horizontal" />

            <QuickSearchBrand />
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
