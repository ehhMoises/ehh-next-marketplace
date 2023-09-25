'use client';

import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/models/paramsPage';
import { useGetGrowingMethodsQuery } from '@/app/(Grower)/hooks/queries/useGrowingMethodsQuery';
import { useGetBrandByIdQuery } from '@/app/(Grower)/hooks/queries/useBrandsQuery';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateBrandMutation, useUpdateBrandMutation } from '@/app/(Grower)/hooks/mutations/useBrandMutation';
import { useToast } from '@/components/ui/use-toast';
import { BrandFormComponent } from './form';

export const BrandsForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();

  // Get Brand
  const {
    data: brand,
    isError: isErrorBrand,
    isLoading: isLoadingBrand,
    isSuccess: isSuccessBrand,
  } = useGetBrandByIdQuery(id, {
    enabled: !isNew,
  });

  // Create Brand
  const { mutate: createBrand, isLoading: isLoadingCreateBrand } = useCreateBrandMutation();

  // Update Brand
  const { mutate: updateBrand, isLoading: isLoadingUpdateBrand } = useUpdateBrandMutation();

  // Get Growing Methods
  const { data: growingMethods } = useGetGrowingMethodsQuery({});

  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        if (isNew) {
          createBrand(
            { ...values, growingMethod: +values.growingMethod },
            {
              onSuccess: () => {
                resetForm();
                toast({
                  title: 'Brand Successfully Created',
                  className: 'bg-green-500 text-white',
                });
                setTimeout(() => {
                  router.push('/grower/brands/');
                }, 2000);
              },
              onError: (error) => {
                toast({
                  title: 'Brand creation failed',
                  description: `There was an error creating the brand, please try again later. ${error}`,
                  variant: 'destructive',
                });
              },
            }
          );
        } else {
          updateBrand(
            { ...values, growingMethod: +values.growingMethod, id, isActive: true },
            {
              onSuccess: () => {
                resetForm();
                toast({
                  title: 'Brand Successfully Updated',
                  className: 'bg-green-500 text-white',
                });
                setTimeout(() => {
                  router.push('/grower/brands/');
                }, 2000);
              },
              onError: (error) => {
                toast({
                  title: 'Brand update failed',
                  description: `There was an error updating the brand, please try again later. ${error}`,
                  variant: 'destructive',
                });
              },
            }
          );
        }
      },
    });

  useEffect(() => {
    if (!!brand && isSuccessBrand && !isNew) {
      const payload = {
        ...brand,
        growingMethod: brand.growingMethod.id,
      };
      setValues(payload);
      setFieldValue('growingMethod', brand.growingMethod.id);
    }
  }, [brand, isNew, isSuccessBrand, setFieldValue, setValues]);

  const isButtonDisabled = !isValid || !dirty || isLoadingCreateBrand || isLoadingUpdateBrand;

  if (isLoadingBrand && !isNew) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorBrand) {
    return (
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Brand, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <BrandFormComponent
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      touched={touched}
      errors={errors}
      setFieldValue={setFieldValue}
      values={values}
      growingMethods={growingMethods}
      isButtonDisabled={isButtonDisabled}
      isNew={isNew}
    />
  );
};
