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
import { PackStyleFormComponent } from './form';
import { useGetPackStyleByIdQuery } from '@/app/(Grower)/hooks/queries/usePackStyle';
import {
  useCreatePackStyleMutation,
  useUpdatePackStyleMutation,
} from '@/app/(Grower)/hooks/mutations/usePackStyleMutation';

export const PackStyleForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();

  // Get Pack Style
  const {
    data: packStyle,
    isError: isErrorPackStyle,
    isLoading: isLoadingPackStyle,
    isSuccess: isSuccessPackStyle,
  } = useGetPackStyleByIdQuery(id, {
    enabled: !isNew,
  });

  // Create PackStyle
  const { mutate: createPackStyle, isLoading: isLoadingCreatePackStyle } = useCreatePackStyleMutation();

  // Update PackStyle
  const { mutate: updatePackStyle, isLoading: isLoadingUpdatePackStyle } = useUpdatePackStyleMutation();

  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (isNew) {
        createPackStyle(values, {
          onSuccess: () => {
            resetForm();
            toast({
              title: 'Pack Style Successfully Created',
              className: 'bg-green-500 text-white',
            });
            setTimeout(() => {
              router.push('/grower/pack-styles/');
            }, 2000);
          },
          onError: (error) => {
            toast({
              title: 'Pack Style creation failed',
              description: `There was an error creating the Pack Style, please try again later. ${error}`,
              variant: 'destructive',
            });
          },
        });
      } else {
        updatePackStyle(
          { ...values, id, isActive: true },
          {
            onSuccess: () => {
              resetForm();
              toast({
                title: 'Pack Style Successfully Updated',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push('/grower/pack-styles/');
              }, 2000);
            },
            onError: (error) => {
              toast({
                title: 'Pack Style update failed',
                description: `There was an error updating the pack style, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          }
        );
      }
    },
  });

  useEffect(() => {
    if (!!packStyle && isSuccessPackStyle && !isNew) {
      setValues(packStyle);
    }
  }, [packStyle, isNew, isSuccessPackStyle]);

  const isButtonDisabled = !isValid || !dirty || isLoadingCreatePackStyle || isLoadingUpdatePackStyle;

  if (isLoadingPackStyle && !isNew) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorPackStyle) {
    return (
      <div className="bg-white rounded-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Pack Style, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <PackStyleFormComponent
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      touched={touched}
      errors={errors}
      isButtonDisabled={isButtonDisabled}
      isNew={isNew}
    />
  );
};
