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
import { useCreateGradeMutation, useUpdateGradeMutation } from '@/app/(Grower)/hooks/mutations/useGradeMutation';
import { GradeFormComponent } from './form';
import { useGetGradeByIdQuery } from '@/app/(Grower)/hooks/queries/useGradeQuery';

export const Grade: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();

  // Get Grade
  const {
    data: grade,
    isError: isErrorGrade,
    isLoading: isLoadingGrade,
    isSuccess: isSuccessGrade,
  } = useGetGradeByIdQuery(id, {
    enabled: !isNew,
  });

  // Create Grade
  const { mutate: createGrade, isLoading: isLoadingCreateGrade } = useCreateGradeMutation();

  // Update Grade
  const { mutate: updateGrade, isLoading: isLoadingUpdateGrade } = useUpdateGradeMutation();

  const { toast } = useToast();

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      if (isNew) {
        createGrade(values, {
          onSuccess: () => {
            resetForm();
            toast({
              title: 'Grade Successfully Created',
              className: 'bg-green-500 text-white',
            });
            setTimeout(() => {
              router.push('/grower/grades/');
            }, 2000);
          },
          onError: (error) => {
            toast({
              title: 'Grade creation failed',
              description: `There was an error creating the Grade, please try again later. ${error}`,
              variant: 'destructive',
            });
          },
        });
      } else {
        updateGrade(
          { ...values, id, isActive: true },
          {
            onSuccess: () => {
              resetForm();
              toast({
                title: 'Grade Successfully Updated',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push('/grower/grades/');
              }, 2000);
            },
            onError: (error) => {
              toast({
                title: 'Grade update failed',
                description: `There was an error updating the Grade, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          }
        );
      }
    },
  });

  useEffect(() => {
    if (!!grade && isSuccessGrade && !isNew) {
      setValues(grade);
    }
  }, [Grade, isNew, isSuccessGrade]);

  const isButtonDisabled = !isValid || !dirty || isLoadingCreateGrade || isLoadingUpdateGrade;

  if (isLoadingGrade && !isNew) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorGrade) {
    return (
      <div className="bg-white rounded-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Grade, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <GradeFormComponent
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      touched={touched}
      errors={errors}
      isButtonDisabled={isButtonDisabled}
      isNew={isNew}
    />
  );
};
