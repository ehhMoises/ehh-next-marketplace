'use client';

import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
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
import { useCreateCatalogMutation } from '@/app/(Grower)/hooks/mutations/useStockMutation';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useGetCatalogByIdQuery } from '@/app/(Grower)/hooks/queries/useStockQuery';

export const CatalogForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const router = useRouter();
  const id = params.id;
  const {
    data: catalog,
    isLoading: isLoadingCatalog,
    isSuccess: isSuccessCatalog,
    isError: isErrorCatalog,
  } = useGetCatalogByIdQuery(id, {});
  const { data: brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useGetBrandsQuery({});
  const { data: grades, isLoading: isLoadingGrades, isError: isErrorGrades } = useGetGradeQuery({});
  const { data: packStyles, isLoading: isLoadingPackStyles, isError: isErrorPackStyles } = useGetPackStyleQuery({});
  const { data: packSizes, isLoading: isLoadingPackSizes, isError: isErrorPackSizes } = useGetPackSizesQuery({});
  const { mutate: createCatalog, isLoading: isLoadingCreateCatalog } = useCreateCatalogMutation();
  const { mutate: updateCatalog, isLoading: isLoadingUpdateCatalog } = useCreateCatalogMutation();

  const isLoadingData =
    isLoadingBrands ||
    isLoadingGrades ||
    isLoadingPackStyles ||
    isLoadingPackSizes ||
    isLoadingCreateCatalog ||
    isLoadingUpdateCatalog ||
    isLoadingCatalog;

  const isError = isErrorBrands || isErrorGrades || isErrorPackStyles || isErrorPackSizes || isErrorCatalog;

  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        if (isNew) {
          createCatalog(values, {
            onSuccess: (data) => {
              resetForm();
              toast({
                title: 'Catalog Successfully Created',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push('/grower/catalog/');
              }, 2000);
            },
            onError: (error) => {
              toast({
                title: 'Catalog creation failed',
                description: `There was an error creating the catalog, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          });
        } else {
          updateCatalog(values, {
            onSuccess: (data) => {
              resetForm();
              toast({
                title: 'Catalog Successfully Updated',
                className: 'bg-green-500 text-white',
              });
              setTimeout(() => {
                router.push('/grower/catalog/');
              }, 2000);
            },
            onError: (error) => {
              toast({
                title: 'Catalog update failed',
                description: `There was an error updating the catalog, please try again later. ${error}`,
                variant: 'destructive',
              });
            },
          });
        }
      },
    });

  const isButtonDisabled = !isValid || !dirty || isLoadingData;

  console.log('errors', errors);

  useEffect(() => {
    if (!!catalog && isSuccessCatalog && !isNew) {
      // const payload = values;
      setFieldValue('id', catalog.id);
      setFieldValue('header', catalog.header);
      setFieldValue('subHeader', catalog.subHeader);
      setFieldValue('startDate', catalog.startDate);
      setFieldValue('endDate', catalog.endDate);
      setFieldValue('minPrice', catalog.minPrice);
      setFieldValue('totalQuantity', catalog.totalQuantity);
      setFieldValue('reservedQuantity', catalog.reservedQuantity);
    }
  }, [catalog, isNew, isSuccessCatalog]);

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
      catalog={catalog}
    />
  );
};
