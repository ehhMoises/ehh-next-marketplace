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

interface IQuickSearchBrandProps {
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
        <Select
          name="commoditySearch"
          onValueChange={(value) => setFieldValue('commoditySearch', value)}
          value={values.commoditySearch}
        >
          <SelectTrigger>
            <SelectValue placeholder="Commodity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'1-apples'}>Apples</SelectItem>
              <SelectItem value={'2-asparagaus'}>Asparagaus</SelectItem>
              <SelectItem value={'3-blueberries'}>Blueberries</SelectItem>
              <SelectItem value={'4-brussels'}>Brussel Sprouts</SelectItem>
              <SelectItem value={'5-carrots'}>Carrots</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {touched.commoditySearch && errors.commoditySearch && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.commoditySearch}</p>
        )}
      </div>

      <div key="packSizeSearch">
        <Select
          name="packSizeSearch"
          onValueChange={(value) => setFieldValue('packSizeSearch', value)}
          value={values.packSizeSearch}
        >
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
        {touched.packSizeSearch && errors.packSizeSearch && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packSizeSearch}</p>
        )}
      </div>

      <div key="packStyleSearch">
        <Select
          name="packStyleSearch"
          onValueChange={(value) => setFieldValue('packStyleSearch', value)}
          value={values.packStyleSearch}
        >
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
        {touched.packStyleSearch && errors.packStyleSearch && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packStyleSearch}</p>
        )}
      </div>

      <div key="gradeSearch">
        <Select
          name="gradeSearch"
          onValueChange={(value) => setFieldValue('gradeSearch', value)}
          value={values.gradeSearch}
        >
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
        {touched.gradeSearch && errors.gradeSearch && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.gradeSearch}</p>
        )}
      </div>

      <div key="quantitySearch">
        <Input
          type="number"
          min={1}
          placeholder="Enter Quantity Needed"
          onChange={(event) => {
            setFieldValue('quantitySearch', event.target.value);
          }}
        />
        {((touched.quantitySearch && errors.quantitySearch) || dirty) && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.quantitySearch}</p>
        )}
      </div>

      <div className="flex flex-col">
        <div key="deliverDateSearch" className="flex flex-row items-center gap-x-1">
          <Popover>
            <PopoverTrigger className="rounded-none" asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !values.deliverDateSearch && 'text-muted-foreground'
                )}
              >
                {values.deliverDateSearch ? (
                  format(new Date(values.deliverDateSearch), 'PPP')
                ) : (
                  <span>Deliver Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={values.deliverDateSearch ? new Date(values.deliverDateSearch) : undefined}
                onSelect={(date) => {
                  setFieldValue('deliverDateSearch', date as Date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <CalendarIcon size={42} className="text-stone-400" />
        </div>
        {touched.deliverDateSearch && errors.deliverDateSearch && (
          <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.deliverDateSearch}</p>
        )}
      </div>
    </section>
  );
};

export { QuickSearchBrand };
