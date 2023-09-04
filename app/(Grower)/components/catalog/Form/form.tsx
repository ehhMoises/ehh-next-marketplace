'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FC, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Grade, IGrade } from '@/models/grade';
import { IGrowerCatalog } from './interface';
import { ResponseHttpBase } from '@/models/http';
import { Brand } from '@/models/brand';
import { GrowingMethod } from '@/models/growingMethod';
import { PackStyle } from '@/models/packStyle';
import { PackSize } from '@/models/packSize';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { StockCatalog } from '@/models/catalog';

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

interface ICatalogProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IGrowerCatalog>>;
  touched: FormikTouched<IGrowerCatalog>;
  errors: FormikErrors<IGrowerCatalog>;
  isButtonDisabled: boolean;
  isNew: boolean;
  brands: ResponseHttpBase<Brand<GrowingMethod>[]> | undefined;
  grades: Grade[] | undefined;
  packStyles: PackStyle[] | undefined;
  packSizes: PackSize[] | undefined;
  values: IGrowerCatalog;
  catalog: StockCatalog | undefined;
}

export const CatalogFormComponent: FC<ICatalogProps> = ({
  handleSubmit,
  getFieldProps,
  setFieldValue,
  touched,
  errors,
  isButtonDisabled,
  isNew,
  brands,
  grades,
  packStyles,
  packSizes,
  values,
  catalog,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  console.log('values', values);
  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Product Information</div>
      <div className="bg-gray-300 flex flex-col p-4">
        <div className="font-bold">{catalog?.header}</div>
        <div>{catalog?.subHeader}</div>
      </div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          {/* BRAND */}
          {isNew && (
            <div key="brand" className="mb-4">
              <label htmlFor="commodity">Brand:</label>
              <Select name="brandId" onValueChange={(value) => setFieldValue('brandId', value)} value={values.brandId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {brands?.data.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        <p className="capitalize">{brand.variety}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {touched.brandId && errors.brandId && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.brandId}</p>
              )}
            </div>
          )}

          {/* Pack Styles */}
          {isNew && (
            <div key="packStyle" className="mb-4">
              <label htmlFor="packStyle">Pack Style:</label>
              <Select
                name="packStyle"
                onValueChange={(value) => setFieldValue('packStyleId', value)}
                value={values.packStyleId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Pack Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {packStyles?.map((packStyle) => (
                      <SelectItem key={packStyle.id} value={packStyle.id}>
                        <p className="capitalize">{packStyle.name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {touched.packStyleId && errors.packStyleId && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packStyleId}</p>
              )}
            </div>
          )}

          {/* Pack Sizes */}
          {isNew && (
            <div key="packSize" className="mb-4">
              <label htmlFor="packSize">Pack Size:</label>
              <Select
                name="packSize"
                onValueChange={(value) => setFieldValue('packSizeId', value)}
                value={values.packSizeId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Pack Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {packSizes?.map((packSize) => (
                      <SelectItem key={packSize.id} value={packSize.id}>
                        <p className="capitalize">{packSize.name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {touched.packSizeId && errors.packSizeId && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packSizeId}</p>
              )}
            </div>
          )}

          {/* GRADE */}
          {isNew && (
            <div key="grade" className="mb-4">
              <label htmlFor="grade">Grade:</label>
              <Select name="grade" onValueChange={(value) => setFieldValue('gradeId', value)} value={values.gradeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {grades?.map((grade) => (
                      <SelectItem key={grade.id} value={grade.id}>
                        <p className="capitalize">{grade.name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {touched.gradeId && errors.gradeId && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.gradeId}</p>
              )}
            </div>
          )}

          {/* Start Date */}
          <div className="flex flex-col mb-4">
            <label htmlFor="startDate">Start Date:</label>
            <div key="deliverDate" className="flex flex-row items-center gap-x-1">
              <Popover>
                <PopoverTrigger className="rounded-none" asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !values.startDate && 'text-muted-foreground'
                    )}
                  >
                    {values.startDate ? format(new Date(values.startDate), 'PPP') : <span>Start Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={values.startDate ? new Date(values.startDate) : undefined}
                    onSelect={(date) => {
                      setFieldValue('startDate', date as Date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <CalendarIcon size={35} className="text-stone-400" />
            </div>
            {touched.startDate && errors.startDate && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.startDate}</p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col mb-4">
            <label htmlFor="endDate">End Date:</label>
            <div key="deliverDate" className="flex flex-row items-center gap-x-1">
              <Popover>
                <PopoverTrigger className="rounded-none" asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !values.endDate && 'text-muted-foreground'
                    )}
                  >
                    {values.endDate ? format(new Date(values.endDate), 'PPP') : <span>End Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={values.endDate ? new Date(values.endDate) : undefined}
                    onSelect={(date) => {
                      setFieldValue('endDate', date as Date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <CalendarIcon size={35} className="text-stone-400" />
            </div>
            {touched.endDate && errors.endDate && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.endDate}</p>
            )}
          </div>

          {/* Min Price */}
          <div className="pb-4">
            <Label htmlFor="minPrice">Min Price:</Label>
            <Input type="number" placeholder="minPrice" id="minPrice" {...getFieldProps('minPrice')} />
            {touched.minPrice && errors.minPrice && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.minPrice}</p>
            )}
          </div>

          {/* Total Quantity */}
          <div className="pb-4">
            <Label htmlFor="totalQuantity">Total Quantity:</Label>
            <Input type="number" placeholder="totalQuantity" id="totalQuantity" {...getFieldProps('totalQuantity')} />
            {touched.totalQuantity && errors.totalQuantity && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.totalQuantity}</p>
            )}
          </div>

          {/* Reserved Quantity */}
          <div className="pb-4">
            <Label htmlFor="reservedQuantity">Reserved Quantity:</Label>
            <Input
              type="number"
              placeholder="reservedQuantity"
              id="reservedQuantity"
              {...getFieldProps('reservedQuantity')}
            />
            {touched.reservedQuantity && errors.reservedQuantity && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.reservedQuantity}</p>
            )}
          </div>

          {/* Standard Price */}
          <div className="pb-4">
            <Label htmlFor="standardPrice">Standard Price:</Label>
            <Input type="number" placeholder="standardPrice" id="standardPrice" {...getFieldProps('standardPrice')} />
            {touched.standardPrice && errors.standardPrice && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.standardPrice}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/grower/catalog')} className="mr-4">
              Cancel
            </Button>
            <Button type="submit" disabled={isButtonDisabled}>
              {isNew ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
