'use client';

import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormikErrors, FormikTouched } from 'formik';
import { IFilter, KeysFilterBrand } from '../lib/filterBrandSchema';
import { PackSize } from '@/models/packSize';
import { PackStyle } from '@/models/packStyle';
import { Grade } from '@/models/grade';
import { Brand } from '@/models/brand';
import { GrowingMethod } from '@/models/growingMethod';

interface IQuickSearchBrandProps {
  brands: Brand<GrowingMethod>[];
  packSizeList: PackSize[];
  packStyles: PackStyle[];
  grades: Grade[];
  touched: FormikTouched<IFilter<Date, string>>;
  errors: FormikErrors<IFilter>;
  values: IFilter;
  setFieldValue: (
    field: KeysFilterBrand,
    value: number | string | Date,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IFilter>>;
  dirty: boolean;
}

const QuickSearchBrand: FC<IQuickSearchBrandProps> = ({
  brands,
  packSizeList,
  packStyles,
  grades,
  values,
  setFieldValue,
  touched,
  errors,
  dirty,
}) => {
  return (
    <section className="flex flex-col gap-y-3">
      <div key="commoditySearch">
        <Select name="commodity" onValueChange={(value) => setFieldValue('commodity', value)} value={values.commodity}>
          <SelectTrigger>
            <SelectValue placeholder="Commodity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.commodity}>
                  <p className="capitalize">{brand.commodity}</p>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {touched.commodity && errors.commodity && dirty && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.commodity}</p>
        )}
      </div>

      <div key="packSizeSearch">
        <Select name="packSize" onValueChange={(value) => setFieldValue('packSize', value)} value={values.packSize}>
          <SelectTrigger>
            <SelectValue placeholder="Pack Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {packSizeList.map((packSize) => (
                <SelectItem key={packSize.id} value={packSize.id}>
                  {packSize.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {touched.packSize && errors.packSize && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packSize}</p>}
      </div>

      <div key="packStyle">
        <Select name="packStyle" onValueChange={(value) => setFieldValue('packStyle', value)} value={values.packStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Pack Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {packStyles.map((packStyle) => (
                <SelectItem key={packStyle.id} value={packStyle.id}>
                  {packStyle.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {touched.packStyle && errors.packStyle && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packStyle}</p>
        )}
      </div>

      <div key="grade">
        <Select name="grade" onValueChange={(value) => setFieldValue('grade', value)} value={values.grade}>
          <SelectTrigger>
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {grades.map((grade) => (
                <SelectItem key={grade.id} value={grade.id}>
                  {grade.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {touched.grade && errors.grade && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.grade}</p>}
      </div>

      <div key="quantity">
        <Input
          type="number"
          min={1}
          placeholder="Enter Quantity Needed"
          onChange={(event) => {
            setFieldValue('quantity', event.target.value);
          }}
        />
        {touched.quantity && errors.quantity && dirty && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.quantity}</p>
        )}
      </div>

      <div className="flex flex-col">
        <div key="deliverDate" className="flex flex-row items-center gap-x-1">
          <Popover>
            <PopoverTrigger className="rounded-none" asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !values.deliverDate && 'text-muted-foreground'
                )}
              >
                {values.deliverDate ? format(new Date(values.deliverDate), 'PPP') : <span>Deliver Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={values.deliverDate ? new Date(values.deliverDate) : undefined}
                onSelect={(date) => {
                  setFieldValue('deliverDate', date as Date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <CalendarIcon size={42} className="text-stone-400" />
        </div>
        {touched.deliverDate && errors.deliverDate && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.deliverDate}</p>
        )}
      </div>
    </section>
  );
};

export { QuickSearchBrand };
