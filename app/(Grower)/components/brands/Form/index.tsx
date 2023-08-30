'use client';

import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { IParamsProps } from '@/app/interfaces';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetGrowingMethodsQuery } from '@/app/(Grower)/hooks/queries/useGrowingMethodsQuery';
import { Button } from '@/components/ui/button';
import { useGetBrandByIdQuery } from '@/app/(Grower)/hooks/queries/useBrandsQuery';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateBrandMutation } from '@/app/(Grower)/hooks/mutations/useBrandMutation';

export const BrandsForm: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  const isNew = params.id === 'new';
  const id = params.id;
  const router = useRouter();

  // Get Brand
  const {
    data: brand,
    isError: isErrorBrand,
    isLoading: isLoadingBrand,
  } = useGetBrandByIdQuery(id, {
    enabled: id !== undefined && !isNew,
  });

  // Create Brand
  const {
    mutate: createBrand,
    isLoading: isLoadingCreateBrand,
    isError: isErrorCreateBrand,
  } = useCreateBrandMutation();

  // Get Growing Methods
  const { data: growingMethods } = useGetGrowingMethodsQuery({});

  // Form
  const { handleSubmit, values, getFieldProps, errors, touched, resetForm, isValid, dirty, setValues, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        if (isNew) {
          createBrand(values, {
            onSuccess: (data) => {
              console.log('Brand created', data);
            },
          });
        }
      },
    });

  useEffect(() => {
    if (brand && !isNew) {
      const payload = {
        ...brand,
        growingMethod: brand.growingMethod.id,
      };
      setValues(payload);
      setFieldValue('growingMethod', brand.growingMethod.id);
    }
  }, [brand]);

  if (isLoadingBrand) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isErrorBrand) {
    return (
      <div className="bg-white rounded-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Brand, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-orange-500 p-4 text-white">Brand Information</div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Label htmlFor="name">Name:</Label>
            <Input id="name" {...getFieldProps('name')} placeholder="Name" />
            {touched.name && errors.name && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="description">Description:</Label>
            <Textarea placeholder="Type your description here." id="description" {...getFieldProps('description')} />
            {touched.description && errors.description && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="commodity">Commodity:</Label>
            <Input id="commodity" {...getFieldProps('commodity')} placeholder="Commodity" />
            {touched.commodity && errors.commodity && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.commodity}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="variety">Variety:</Label>
            <Input id="variety" {...getFieldProps('variety')} placeholder="Variety" />
            {touched.variety && errors.variety && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.variety}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="subVariety">Sub Variety:</Label>
            <Input id="subVariety" {...getFieldProps('subVariety')} placeholder="Sub Variety" />
            {touched.subVariety && errors.subVariety && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.subVariety}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="plu">PLU:</Label>
            <Input id="plu" {...getFieldProps('plu')} placeholder="PLU" />
            {touched.plu && errors.plu && dirty && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.plu}</p>}
          </div>
          <div key="commoditySearch" className="mb-4">
            <Label htmlFor="growing-method">Growing Method:</Label>
            <Select
              name="growingMethod"
              onValueChange={(value) => setFieldValue('growingMethod', value)}
              value={String(values.growingMethod)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Growing Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {growingMethods?.data.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      <p className="capitalize">{item.name}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {touched.growingMethod && errors.growingMethod && dirty && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.growingMethod}</p>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/grower/brands')} className="mr-4">
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || !dirty}>
              {isNew ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
