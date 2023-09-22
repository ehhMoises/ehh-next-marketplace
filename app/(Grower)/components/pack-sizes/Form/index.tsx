'use client';

import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { PackSizeFormComponent } from './form';
import { useGetPackSizeByIdQuery } from '@/app/(Grower)/hooks/queries/usePackSize';
import {
  useCreatePackSizeMutation,
  useUpdatePackSizeMutation,
} from '@/app/(Grower)/hooks/mutations/usePackSizeMutation';
import { useGetPackStyleQuery } from '@/app/(Grower)/hooks/queries/usePackStyle';

export const PackSizeForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();

  // Get Pack Size
  const {
    data: packSize,
    isError: isErrorPackSize,
    isLoading: isLoadingPackSize,
    isSuccess: isSuccessPackSize,
  } = useGetPackSizeByIdQuery(id, {
    enabled: !isNew,
  });

  // Get Pack Style
  const { data: packStyles } = useGetPackStyleQuery({});

  // Create PackSize
  const { mutate: createPackSize, isLoading: isLoadingCreatePackSize } = useCreatePackSizeMutation();

  // Update PackSize
  const { mutate: updatePackSize, isLoading: isLoadingUpdatePackSize } = useUpdatePackSizeMutation();

  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        if (isNew) {
          createPackSize(values, {
            onSuccess: () => {
              resetForm();
              toast({
                title: 'Pack Size Successfully Created',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push('/grower/pack-sizes/');
              }, 2000);
            },
            onError: (error) => {
              toast({
                title: 'Pack Size creation failed',
                description: `There was an error creating the Pack Size, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          });
        } else {
          updatePackSize(
            { ...values, id, isActive: true },
            {
              onSuccess: () => {
                resetForm();
                toast({
                  title: 'Pack Size Successfully Updated',
                  className: 'bg-green-500 text-white',
                });
                setTimeout(() => {
                  router.push('/grower/pack-sizes/');
                }, 2000);
              },
              onError: (error) => {
                toast({
                  title: 'Pack Size update failed',
                  description: `There was an error updating the Pack Size, please try again later. ${error}`,
                  variant: 'destructive',
                });
              },
            }
          );
        }
      },
    });

  useEffect(() => {
    if (!!packSize && isSuccessPackSize && !isNew) {
      setValues(packSize);
    }
  }, [packSize, isNew, isSuccessPackSize]);

  const isButtonDisabled = !isValid || !dirty || isLoadingCreatePackSize || isLoadingUpdatePackSize;

  if (isLoadingPackSize && !isNew) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorPackSize) {
    return (
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Pack Size, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <PackSizeFormComponent
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      touched={touched}
      errors={errors}
      isButtonDisabled={isButtonDisabled}
      isNew={isNew}
      packStyles={packStyles}
      values={values}
      setFieldValue={setFieldValue}
    />
  );
};
