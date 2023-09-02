'use client';

import { useFormik } from 'formik';
import { FC } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import { useGetBrandsQuery } from '@/app/(Grower)/hooks/queries/useBrandsQuery';
import { useGetGradeQuery } from '@/app/(Grower)/hooks/queries/useGradeQuery';
import { useGetPackStyleQuery } from '@/app/(Grower)/hooks/queries/usePackStyle';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useGetPackSizesQuery } from '@/app/(Grower)/hooks/queries/usePackSize';
import { CatalogFormComponent } from './form';

export const CatalogForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const { data: brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useGetBrandsQuery({});
  const { data: grades, isLoading: isLoadingGrades, isError: isErrorGrades } = useGetGradeQuery({});
  const { data: packStyles, isLoading: isLoadingPackStyles, isError: isErrorPackStyles } = useGetPackStyleQuery({});
  const { data: packSizes, isLoading: isLoadingPackSizes, isError: isErrorPackSizes } = useGetPackSizesQuery({});

  const isLoadingData = isLoadingBrands || isLoadingGrades || isLoadingPackStyles || isLoadingPackSizes;
  const isError = isErrorBrands || isErrorGrades || isErrorPackStyles || isErrorPackSizes;
  // TOOD: Check this
  const isButtonDisabled = true;

  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {},
    });

  if (isLoadingData) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading the form, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <CatalogFormComponent
      isNew={isNew}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleSubmit}
      getFieldProps={getFieldProps}
      setFieldValue={setFieldValue}
      errors={errors}
      touched={touched}
      brands={brands}
      grades={grades}
      packStyles={packStyles}
      packSizes={packSizes}
      values={values}
    />
  );
};
