import { FC } from 'react';
import { QuickSearchBrand } from './QuickSearchBrand';
import { Separator } from '@/components/ui/separator';
import { AdvancedFilterBrand } from './AdvancedFilterBrand';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import FilterBrandValidationSchema, { filterInitialValues } from '../lib/filterBrandSchema';

const BrandFilters: FC = () => {
  // Create Listing
  const onSubmit = async () => {
    console.log('form values', values);
  };

  // Formik
  const { setFieldValue, handleSubmit, values, errors, dirty } = useFormik({
    initialValues: filterInitialValues,
    validationSchema: FilterBrandValidationSchema,
    onSubmit,
  });

  return (
    <section className="w-full px-4">
      <div className="flex flex-col gap-y-6">
        <div className="border border-stone-300 bg-[#f7f7f7] flex flex-col py-5 px-5">
          <h2 className="uppercase text-stone-400 font-bold">Quick Search</h2>
          <Separator className="my-3" orientation="horizontal" />

          <form onSubmit={handleSubmit} className="flex flex-col">
            <QuickSearchBrand values={values} setFieldValue={setFieldValue} errors={errors} dirty={dirty} />

            <Button variant="thirdnary" type="submit" className="mt-5">
              <span className="text-white">Search</span>
            </Button>
          </form>
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
    </section>
  );
};

export default BrandFilters;
