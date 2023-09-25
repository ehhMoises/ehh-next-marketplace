'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched, useFormik } from 'formik';
import { FC, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { IUser } from '@/models/users';
import { IEnum } from '@/models/enum';

interface IUserFormComponentProps {
  touched: FormikTouched<IUser>;
  errors: FormikErrors<IUser>;
  userTypes: IEnum[] | undefined;
  userStatuses: IEnum[] | undefined;
  values: IUser;
  isButtonDisabled: boolean;
  isNew: boolean;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IUser>>;
}

export const UserFormComponent: FC<IUserFormComponentProps> = ({
  touched,
  errors,
  userTypes,
  userStatuses,
  values,
  isButtonDisabled,
  isNew,
  handleSubmit,
  getFieldProps,
  setFieldValue,
}) => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="bg-marketplace p-4 text-white">User Information</div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Label htmlFor="name">Name:</Label>
            <Input id="name" {...getFieldProps('name')} placeholder="Name" />
            {touched.name && errors.name && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.name}</p>}
          </div>

          <div className="pb-4">
            <Label htmlFor="email">email:</Label>
            <Input typeof="email" id="email" {...getFieldProps('email')} placeholder="email" disabled={!isNew} />
            {touched.email && errors.email && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.email}</p>}
          </div>

          {isNew && (
            <div className="pb-4">
              <Label htmlFor="password">Password:</Label>
              <Input typeof="password" id="password" {...getFieldProps('password')} placeholder="password" />
              {touched.password && errors.password && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.password}</p>
              )}
            </div>
          )}

          <div className="pb-4">
            <Label htmlFor="position">Position:</Label>
            <Input id="position" {...getFieldProps('position')} placeholder="position" />
            {touched.position && errors.position && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.position}</p>
            )}
          </div>

          <div key="userType" className="mb-4">
            <Label htmlFor="growing-method">Type:</Label>
            <Select name="type" onValueChange={(value) => setFieldValue('type', value)} value={String(values.type)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {userTypes?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <p className="capitalize">{item.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.type && errors.type && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.type}</p>}
          </div>

          <div key="userStatus" className="mb-4">
            <Label htmlFor="growing-method">Status:</Label>
            <Select
              name="status"
              onValueChange={(value) => setFieldValue('status', value)}
              value={String(values.status)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {userStatuses?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <p className="capitalize">{item.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.status && errors.status && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.status}</p>}
          </div>
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/users/home')} className="mr-4">
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
