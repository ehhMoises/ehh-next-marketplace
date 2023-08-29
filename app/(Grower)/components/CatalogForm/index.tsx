'use client';

import { useFormik } from 'formik';
import { FC } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import { useGetBrandsQuery } from '../../hooks/queries';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

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
      <form onSubmit={handleSubmit}>
        {isLoadingBrands ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div key="commoditySearch">
            <Select
              name="commodity"
              onValueChange={(value) => setFieldValue('commodity', value)}
              value={values.commodity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Commodity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brands?.data.map((brand) => (
                    <SelectItem key={brand.id} value={brand.commodity}>
                      <p className="capitalize">{brand.commodity}</p>
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
  );
};
