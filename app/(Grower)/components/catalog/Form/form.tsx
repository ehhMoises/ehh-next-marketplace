'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched, useFormik } from 'formik';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FC, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Grade, IGrade } from '@/models/grade';
import { IGrowerCatalog } from './interface';
import { ResponseHttpBase } from '@/models/http';
import { Brand } from '@/models/brand';
import { GrowingMethod } from '@/models/growingMethod';
import { PackStyle } from '@/models/packStyle';
import { PackSize } from '@/models/packSize';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

interface ICatalogProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IGrowerCatalog>>;
  touched: FormikTouched<IGrowerCatalog>;
  errors: FormikErrors<IGrowerCatalog>;
  isButtonDisabled: boolean;
  isNew: boolean;
  brands: ResponseHttpBase<Brand<GrowingMethod>[]> | undefined;
  grades: Grade[] | undefined;
  packStyles: PackStyle[] | undefined;
  packSizes: PackSize[] | undefined;
  values: IGrowerCatalog;
}

export const CatalogFormComponent: FC<ICatalogProps> = ({
  handleSubmit,
  getFieldProps,
  setFieldValue,
  touched,
  errors,
  isButtonDisabled,
  isNew,
  brands,
  grades,
  packStyles,
  packSizes,
  values,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Product Information</div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          {/* BRAND */}
          <div key="brand" className="mb-4">
            <label htmlFor="commodity">Brand:</label>
            <Select name="brandId" onValueChange={(value) => setFieldValue('brandId', value)} value={values.brandId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brands?.data.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      <p className="capitalize">{brand.variety}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.brandId && errors.brandId && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.brandId}</p>
            )}
          </div>

          {/* Pack Styles */}
          <div key="packStyle" className="mb-4">
            <label htmlFor="packStyle">Pack Style:</label>
            <Select
              name="packStyle"
              onValueChange={(value) => setFieldValue('packStyle', value)}
              value={values.packSizeId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Pack Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {packStyles?.map((packStyle) => (
                    <SelectItem key={packStyle.id} value={packStyle.id}>
                      <p className="capitalize">{packStyle.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.packStyleId && errors.packStyleId && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packStyleId}</p>
            )}
          </div>

          {/* Pack Sizes */}
          <div key="packSize" className="mb-4">
            <label htmlFor="packSize">Pack Size:</label>
            <Select
              name="packSize"
              onValueChange={(value) => setFieldValue('packSize', value)}
              value={values.packSizeId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Pack Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {packSizes?.map((packSize) => (
                    <SelectItem key={packSize.id} value={packSize.id}>
                      <p className="capitalize">{packSize.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.packSizeId && errors.packSizeId && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packSizeId}</p>
            )}
          </div>

          {/* GRADE */}
          <div key="grade" className="mb-4">
            <label htmlFor="grade">Grade:</label>
            <Select name="grade" onValueChange={(value) => setFieldValue('grade', value)} value={values.gradeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {grades?.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id}>
                      <p className="capitalize">{grade.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.gradeId && errors.gradeId && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.gradeId}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
