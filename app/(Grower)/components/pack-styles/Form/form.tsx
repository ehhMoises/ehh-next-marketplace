'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched, useFormik } from 'formik';
import { FC, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IPackStyle } from '@/models/packStyle';

interface IPackStyleProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  touched: FormikTouched<IPackStyle>;
  errors: FormikErrors<IPackStyle>;
  isButtonDisabled: boolean;
  isNew: boolean;
}

export const PackStyleFormComponent: FC<IPackStyleProps> = ({
  handleSubmit,
  getFieldProps,
  touched,
  errors,
  isButtonDisabled,
  isNew,
}) => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="bg-marketplace p-4 text-white">Pack Style</div>
      <div className="p-4 bg-marketplace-accent-2">
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
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/grower/pack-styles')} className="mr-4">
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
