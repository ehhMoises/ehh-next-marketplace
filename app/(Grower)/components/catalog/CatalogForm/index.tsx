'use client';

import { useFormik } from 'formik';
import { FC } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBrandsQuery } from '@/app/(Grower)/hooks/queries';

export const CatalogForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  // const { data: brands, isLoading: isLoadingBrands, isError, error } = useGetBrandsQuery({});
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {},
    });

  const brands = [
    {
      label: 'Apple',
      value: 'Apple',
    },
    {
      label: 'Berry',
      value: 'Berry',
    },
    {
      label: 'Raspberries',
      value: 'Raspberries',
    },
    {
      label: 'Fuji',
      value: 'Fuji',
    },
  ];

  const grades = [
    {
      label: 'Grade 1',
      value: 'Grade 1',
    },
    {
      label: 'Grade 2',
      value: 'Grade 2',
    },
    {
      label: 'Grade 3',
      value: 'Grade 3',
    },
    {
      label: 'Grade 4',
      value: 'Grade 4',
    },
  ];

  // console.log('Brands', brands?.data);
  const isLoadingBrands = false;

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
                    {/* {brands?.data.map((brand) => ( */}
                    {brands.map((brand) => (
                      <SelectItem key={brand.value} value={brand.value}>
                        <p className="capitalize">{brand.label}</p>
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
          <div key="grade" className="mb-4">
            <label htmlFor="gradeId">Grade:</label>
            <Select name="gradeId" onValueChange={(value) => setFieldValue('gradeId', value)} value={values.gradeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* {brands?.data.map((brand) => ( */}
                  {brands.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value}>
                      <p className="capitalize">{brand.label}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.gradeId && errors.gradeId && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.gradeId}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
