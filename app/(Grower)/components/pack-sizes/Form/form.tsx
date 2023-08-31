'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched, useFormik } from 'formik';
import { FC, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IPackSize } from '@/models/packSize';
import { PackStyle } from '@/models/packStyle';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IPackSizeProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<IPackSize>>
  touched: FormikTouched<IPackSize>;
  errors: FormikErrors<IPackSize>;
  isButtonDisabled: boolean;
  isNew: boolean;
  packStyles: PackStyle[] | undefined;
  values: IPackSize;
}

export const PackSizeFormComponent: FC<IPackSizeProps> = ({
  handleSubmit,
  getFieldProps,
  setFieldValue,
  touched,
  errors,
  isButtonDisabled,
  isNew,
  packStyles,
  values,
}) => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="bg-orange-500 p-4 text-white">Pack Size</div>
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
            <Label htmlFor="unitOfMeasure">Unit Of Measure:</Label>
            <Input
              placeholder="Type your Unit of Measure here."
              id="unitOfMeasure"
              {...getFieldProps('unitOfMeasure')}
            />
            {touched.unitOfMeasure && errors.unitOfMeasure && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.unitOfMeasure}</p>
            )}
          </div>

          <div className="pb-4">
            <Label htmlFor="abbreviation">Abreviation:</Label>
            <Input placeholder="Type your Abreviation here." id="abbreviation" {...getFieldProps('abbreviation')} />
            {touched.abbreviation && errors.abbreviation && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.abbreviation}</p>
            )}
          </div>

          <div className="pb-4">
            <Label htmlFor="min">Min:</Label>
            <Input type="number" placeholder="Min" id="min" {...getFieldProps('min')} />
            {touched.min && errors.min && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.min}</p>}
          </div>

          <div className="pb-4">
            <Label htmlFor="min">Max:</Label>
            <Input type="number" placeholder="max" id="max" {...getFieldProps('max')} />
            {touched.max && errors.max && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.max}</p>}
          </div>

          <div key="packStyles" className="mb-4">
            <Label htmlFor="packStyleId">Pack Style:</Label>
            <Select
              name="packStyleId"
              onValueChange={(value) => setFieldValue('packStyleId', value)}
              value={String(values.packStyleId)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Pack Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {packStyles?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <p className="capitalize">{item.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.packStyleId && errors.packStyleId && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packStyleId}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/grower/pack-sizes')} className="mr-4">
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
