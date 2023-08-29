'use client';

import { useFormik } from 'formik';
import { FC } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBrandsQuery } from '@/app/(Grower)/hooks/queries/useBrandsQuery';

export const CatalogForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const { data: brands, isLoading: isLoadingBrands, isError, error } = useGetBrandsQuery({});
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {},
    });

  console.log('Brands', brands?.data);

  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Product Information</div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          {isLoadingBrands ? (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          ) : (
            <div key="commoditySearch" className="mb-4">
              <label htmlFor="commodity">Brand:</label>
              <Select
                name="commodity"
                onValueChange={(value) => setFieldValue('commodity', value)}
                value={values.commodity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {brands?.data.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        <p className="capitalize">
                          {brand.commodity} / {brand.variety}
                        </p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {touched.commodity && errors.commodity && dirty && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.commodity}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
