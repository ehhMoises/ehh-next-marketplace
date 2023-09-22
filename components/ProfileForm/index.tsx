'use client';

import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import utilsProfileForm from './profileForm.utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AddressProfileForm } from './AddressProfileForm';
import { IAddressAccountBody } from '@/models/account-user';
import { Button } from '@/components/ui/button';
import { useGetProfileQuery } from '@/lib/hooks/useProfileQuery';
import { Separator } from '@/components/ui/separator';
import { useProfileMutation } from '@/lib/hooks/useProfileMutation';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const { initialValues, validationSchema } = utilsProfileForm;

export const ProfileFormComponent: FC<{ titleForm: string }> = ({ titleForm }) => {
  const { toast } = useToast();
  const { account, addresses, isLoadingAccount, isLoadingAddresses } = useGetProfileQuery();
  const {
    applyMutation,
    isLoading: isLoadingProfileFormMutation,
    isSuccess: isSuccessProfileFormMutation,
  } = useProfileMutation();
  const isLoading = isLoadingAccount || isLoadingAddresses || isLoadingProfileFormMutation;
  const { handleSubmit, getFieldProps, values, setValues, setFieldValue, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (resultFormValues) => {
        await applyMutation({
          account: {
            name: resultFormValues.name,
            contactName: resultFormValues.contactName,
            contactPhone: resultFormValues.contactPhone,
            description: resultFormValues.description,
            logoUrl: '',
          },
          addresses: resultFormValues.addresses,
        });

        if (isSuccessProfileFormMutation) {
          toast({
            title: 'Profile Successfully Updated',
            className: 'bg-slate-500 text-white',
          });
        }
      },
    });

  const isNameInvalid = errors.name && touched.name;
  const isDescriptionInvalid = errors.description && touched.description;
  const isContactNameInvalid = errors.contactName && touched.contactName;
  const iscontactPhoneInvalid = errors.contactPhone && touched.contactPhone;

  useEffect(() => {
    if (addresses.length > 0) {
      const addressesValues = addresses.map((address) => {
        return {
          id: address.id,
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          zip: address.zip,
        };
      });
      setFieldValue('addresses', addressesValues);
    }
  }, [addresses, setFieldValue]);

  useEffect(() => {
    if (account) {
      setFieldValue('name', account.name);
      setFieldValue('description', account.description ?? '');
      setFieldValue('contactName', account.contactName ?? '');
      setFieldValue('contactPhone', account.contactPhone ?? '');
    }
  }, [account, setFieldValue]);

  return (
    <section>
      <div className="bg-marketplace p-4 text-white">{titleForm}</div>

      <div className="p-4 bg-[#efefef]">
        <form className="flex flex-col gap-y-5 w-full xl:w-6/12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1">
            <div className="flex flex-col sm:flex-row w-full items-center">
              <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="name">
                Name:{' '}
              </Label>
              {isLoading && <Skeleton className="w-full sm:w-9/12 h-[2.5rem] bg-stone-400 rounded-sm" />}
              {!isLoading && (
                <Input
                  className="w-full sm:w-9/12"
                  name="name"
                  type="text"
                  placeholder="Enter Farm Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              )}
            </div>
            {isNameInvalid && (
              <div className="flex justify-end">
                <p className="text-red-400 mt-3">{errors.name}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1">
            <div className="flex flex-col sm:flex-row w-full items-center">
              <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="description">
                Description:
              </Label>
              {isLoading && <Skeleton className="w-full sm:w-9/12 h-[5rem] bg-stone-400 rounded-sm" />}
              {!isLoading && (
                <Textarea
                  name="description"
                  className="w-full sm:w-9/12"
                  placeholder="Enter Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              )}
            </div>

            {isDescriptionInvalid && (
              <div className="flex justify-end">
                <p className="text-red-400 mt-3">{errors.description}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1">
            <Label className="w-full -[#6c6d6f] font-bold text-[1.1rem]" htmlFor="addresses">
              Addresses:
            </Label>
            <Separator className="my-2.5 bg-stone-300" />
            {isLoading && <Skeleton className="w-full  h-[8rem] bg-stone-400 rounded-sm" />}
            {!isLoading && (
              <AddressProfileForm
                addresses={values.addresses}
                setValues={setValues}
                getFieldProps={getFieldProps}
                errors={errors.addresses as FormikErrors<IAddressAccountBody>[] | undefined}
                touched={touched.addresses}
              />
            )}
          </div>

          <div className="grid grid-cols-1">
            <div className="flex flex-col sm:flex-row w-full items-center">
              <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="contact-name">
                Contact Name:{' '}
              </Label>
              {isLoading && <Skeleton className="w-full sm:w-9/12 h-[2.5rem] bg-stone-400 rounded-sm" />}
              {!isLoading && (
                <Input
                  className="w-full sm:w-9/12"
                  name="contactName"
                  type="text"
                  placeholder="Enter Contact Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactName}
                />
              )}
            </div>
            {isContactNameInvalid && (
              <div className="flex justify-end">
                <p className="text-red-400 mt-3">{errors.contactName}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1">
            <div className="flex flex-col sm:flex-row w-full items-center">
              <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="contact-phone">
                Contact Phone:{' '}
              </Label>
              {isLoading && <Skeleton className="w-full sm:w-9/12 h-[2.5rem] bg-stone-400 rounded-sm" />}
              {!isLoading && (
                <Input
                  className="w-full sm:w-9/12"
                  name="contactPhone"
                  type="text"
                  placeholder="Enter Contact Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactPhone}
                />
              )}
            </div>
            {iscontactPhoneInvalid && (
              <div className="flex justify-end">
                <p className="text-red-400 mt-3">{errors.contactPhone}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button className="mt-3.5 uppercase rounded-sm" disabled={isLoading}>
              <span className="mx-16">Save</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
