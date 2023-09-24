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
import {
  useGetUserStatusesQuery,
  useGetUserTypesQuery,
  useGetUsersByIdQuery,
} from '@/app/(Grower)/hooks/queries/useUsersQuery';
import { useCreateUserdMutation, useUpdateUserMutation } from '@/app/(Grower)/hooks/mutations/useUserMutation';
import { UserFormComponent } from './form';

export const UsersForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();

  // Get User Types
  const { data: userTypes, isLoading: isLoadingUserTypes, isError: isErrorUserTypes } = useGetUserTypesQuery({});

  // Get User
  const {
    data: userStatuses,
    isLoading: isLoadingUserStatuses,
    isError: isErrorUserStatuses,
  } = useGetUserStatusesQuery({});

  // Get User by Id
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
  } = useGetUsersByIdQuery(id, {
    enabled: !isNew,
  });

  // Create User
  const { mutate: createUser, isLoading: isLoadingCreateUser } = useCreateUserdMutation();

  // Update User
  const { mutate: updateUser, isLoading: isLoadingUpdateUser } = useUpdateUserMutation();

  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        if (isNew) {
          createUser(values, {
            onSuccess: (data) => {
              resetForm();
              toast({
                title: 'User Successfully Created',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push('/users/home/');
              }, 2000);
            },
            onError: (error) => {
              toast({
                title: 'User creation failed',
                description: `There was an error creating the user, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          });
        } else {
          updateUser(
            { ...values, status: +values.status, type: +values.type, id },
            {
              onSuccess: (data) => {
                resetForm();
                toast({
                  title: 'User Successfully Updated',
                  className: 'bg-green-500 text-white',
                });
                setTimeout(() => {
                  router.push('/users/home/');
                }, 2000);
              },
              onError: (error) => {
                toast({
                  title: 'User update failed',
                  description: `There was an error updating the user, please try again later. ${error}`,
                  variant: 'destructive',
                });
              },
            }
          );
        }
      },
    });

  useEffect(() => {
    if (!!user && isSuccessUser && !isNew) {
      setValues(user);
      setFieldValue('status', String(user.status.id));
      setFieldValue('type', String(user.type.id));
    }
  }, [isNew, isSuccessUser]);

  const isButtonDisabled = !isValid || !dirty || isLoadingCreateUser || isLoadingUpdateUser;

  if (isLoadingUser && !isNew) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorUser) {
    return (
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading User, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <UserFormComponent
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      touched={touched}
      errors={errors}
      setFieldValue={setFieldValue}
      values={values}
      isButtonDisabled={isButtonDisabled}
      isNew={isNew}
      userTypes={userTypes}
      userStatuses={userStatuses}
    />
  );
};
