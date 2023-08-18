import { FC } from 'react';
import { QuickSearchBrand } from './QuickSearchBrand';
import { Separator } from '@/components/ui/separator';
import { AdvancedFilterBrand } from './AdvancedFilterBrand';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';

export interface IFilter {
  commodity: string;
  packSize: string;
}

const validationSchema = Yup.object().shape({
  commodity: Yup.string(),
  packSize: Yup.string(),
});

const initialValues: IFilter = {
  commodity: '1-apples',
  packSize: '',
};

const BrandFilters: FC = () => {
  // Create Listing
  const onSubmit = async () => {
    console.log('form values', values);
  };

  // Formik
  const {
    getFieldProps,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleChange,
    setValues,
    values,
    errors,
    touched,
    isValid,
    dirty,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log('Form Values when change', values);

  return (
    <section className="w-full px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-6">
          <div className="border border-stone-300 bg-[#f7f7f7] flex flex-col py-5 px-5">
            <h2 className="uppercase text-stone-400 font-bold">Quick Search</h2>
            <Separator className="my-3" orientation="horizontal" />

            <QuickSearchBrand
              getFieldProps={getFieldProps}
              handleChange={handleChange}
              values={values}
              setFieldValue={setFieldValue}
            />
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
        <Button type="submit" className="mt-5">
          Search
        </Button>
      </form>
    </section>
  );
};

export default BrandFilters;
