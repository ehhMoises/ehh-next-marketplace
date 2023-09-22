'use client';

import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { OrderFormComponent } from './form';
import { useGetOrderByIdQuery } from '@/app/(Grower)/hooks/queries/useOrdersQuery';
import { useCreateOrderMutation, useUpdateOrderMutation } from '@/app/(Grower)/hooks/mutations/useOrderMutation';

export const OrdersForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const [currentRootPath, setCurrentRootPath] = useState('');
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      if (pathname === '/grower/home') {
        setCurrentRootPath('/grower/orders');
      }
      if (pathname === '/retailer/home') {
        setCurrentRootPath('/retailer/orders');
      }
      if (pathname === '/grower/orders') {
        setCurrentRootPath('/grower/orders');
      }
      if (pathname === '/retailer/orders') {
        setCurrentRootPath('/retailer/orders');
      }
    }
  }, [pathname]);

  // Get Order
  const {
    data: order,
    isError: isErrorOrder,
    isLoading: isLoadingOrder,
    isSuccess: isSuccessOrder,
  } = useGetOrderByIdQuery(id, {
    enabled: !isNew,
  });

  // Create order
  const { mutate: createOrder, isLoading: isLoadingCreateorder } = useCreateOrderMutation();

  // Update order
  const { mutate: updateOrder, isLoading: isLoadingUpdateorder } = useUpdateOrderMutation();

  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (isNew) {
        createOrder(values, {
          onSuccess: () => {
            resetForm();
            toast({
              title: 'Order Successfully Created',
              className: 'bg-green-500 text-white',
            });
            setTimeout(() => {
              router.push(currentRootPath);
            }, 2000);
          },
          onError: (error: any) => {
            toast({
              title: 'Order creation failed',
              description: `There was an error creating the Order, please try again later. ${error}`,
              variant: 'destructive',
            });
          },
        });
      } else {
        updateOrder(
          { ...values, id },
          {
            onSuccess: () => {
              resetForm();
              toast({
                title: 'Order Successfully Updated',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push(currentRootPath);
              }, 2000);
            },
            onError: (error: any) => {
              toast({
                title: 'Order update failed',
                description: `There was an error updating the Order, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          }
        );
      }
    },
  });

  useEffect(() => {
    if (!!order && isSuccessOrder && !isNew) {
      setValues(order);
    }
  }, [order, isNew, isSuccessOrder]);

  const isButtonDisabled = !isValid || !dirty || isLoadingCreateorder || isLoadingUpdateorder;

  if (isLoadingOrder && !isNew) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorOrder) {
    return (
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Order, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <OrderFormComponent
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      touched={touched}
      errors={errors}
      isButtonDisabled={isButtonDisabled}
      isNew={isNew}
      values={values}
      currentRootPath={currentRootPath}
    />
  );
};
