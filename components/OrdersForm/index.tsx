'use client';

import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/models/paramsPage';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { OrderFormComponent } from './form';
import { useGetOrderByIdQuery } from '@/app/(Grower)/hooks/queries/useOrdersQuery';
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateStatusOrderMutation,
} from '@/app/(Grower)/hooks/mutations/useOrderMutation';
import { AccountType } from '@/models/account-user';

export const OrdersForm: FC<IParamsProps & { accountType?: AccountType }> = ({ params: { id }, accountType }) => {
  const [currentRootPath, setCurrentRootPath] = useState('');
  const isNew = id === 'new';
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

  // Create Order
  const { mutate: createOrder, isLoading: isLoadingCreateorder } = useCreateOrderMutation();
  // Update Order
  const { mutateAsync: updateOrder, isLoading: isLoadingUpdateorder } = useUpdateOrderMutation();
  // Update  Order
  const { mutateAsync: updateStatusOrder, isLoading: isLoadingStatusUpdateorder } = useUpdateStatusOrderMutation();
  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (formValues) => {
        if (isNew) {
          createOrder(formValues, {
            onSuccess: () => {
              resetForm();
              toast({
                title: 'Order Successfully Created',
                className: 'bg-marketplace/90 text-white',
              });
              setTimeout(() => {
                router.push(currentRootPath);
              }, 2000);
            },
            onError: (error: unknown) => {
              toast({
                title: 'Order creation failed',
                description: `There was an error creating the Order, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          });
        } else {
          try {
            await updateOrder({ ...formValues, id });
            await updateStatusOrder({
              ...formValues,
              id,
            });
            resetForm();
            toast({
              title: 'Order Successfully Updated',
              className: 'bg-marketplace/90 text-white',
            });
            setTimeout(() => {
              router.push(currentRootPath);
            }, 2000);
          } catch (error) {
            toast({
              title: 'Order update failed',
              description: `There was an error updating the Order, please try again later. ${error}`,
              variant: 'destructive',
            });
          }
        }
      },
    });

  useEffect(() => {
    if (!!order && isSuccessOrder && !isNew) {
      setValues(order);
    }
  }, [order, isNew, isSuccessOrder, setValues]);

  const isButtonDisabled =
    !isValid || !dirty || isLoadingCreateorder || isLoadingUpdateorder || isLoadingStatusUpdateorder;

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
      setFieldValue={setFieldValue}
      accountType={accountType}
    />
  );
};
