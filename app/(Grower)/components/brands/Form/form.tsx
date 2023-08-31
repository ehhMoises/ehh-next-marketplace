'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched, useFormik } from 'formik';
import { FC, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IBrand } from '@/models/brand';
import { GrowingMethodsResponse } from '@/models/growingMethod';

interface IBrandFormComponentProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  touched: FormikTouched<IBrand<number>>;
  errors: FormikErrors<IBrand<number>>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IBrand<number>>>;
  values: IBrand<number>;
  growingMethods: GrowingMethodsResponse | undefined;
  isButtonDisabled: boolean;
  isNew: boolean;
}

export const BrandFormComponent: FC<IBrandFormComponentProps> = ({
  handleSubmit,
  getFieldProps,
  setFieldValue,
  touched,
  errors,
  values,
  growingMethods,
  isButtonDisabled,
  isNew,
}) => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="bg-orange-500 p-4 text-white">Brand Information</div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Label htmlFor="name">Name:</Label>
            <Input id="name" {...getFieldProps('name')} placeholder="Name" />
            {touched.name && errors.name && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.name}</p>}
          </div>
          <div className="pb-4">
            <Label htmlFor="description">Description:</Label>
            <Textarea placeholder="Type your description here." id="description" {...getFieldProps('description')} />
            {touched.description && errors.description && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="commodity">Commodity:</Label>
            <Input id="commodity" {...getFieldProps('commodity')} placeholder="Commodity" />
            {touched.commodity && errors.commodity && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.commodity}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="variety">Variety:</Label>
            <Input id="variety" {...getFieldProps('variety')} placeholder="Variety" />
            {touched.variety && errors.variety && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.variety}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="subVariety">Sub Variety:</Label>
            <Input id="subVariety" {...getFieldProps('subVariety')} placeholder="Sub Variety" />
            {touched.subVariety && errors.subVariety && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.subVariety}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="plu">PLU:</Label>
            <Input id="plu" {...getFieldProps('plu')} placeholder="PLU" />
            {touched.plu && errors.plu && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.plu}</p>}
          </div>
          <div key="commoditySearch" className="mb-4">
            <Label htmlFor="growing-method">Growing Method:</Label>
            <Select
              name="growingMethod"
              onValueChange={(value) => setFieldValue('growingMethod', value)}
              value={String(values.growingMethod)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Growing Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {growingMethods?.data.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <p className="capitalize">{item.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.growingMethod && errors.growingMethod && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.growingMethod}</p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/grower/brands')} className="mr-4">
              Cancel
            </Button>
            <Button type="submit" disabled={isButtonDisabled}>
              {isNew ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
