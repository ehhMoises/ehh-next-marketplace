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
import { FormikErrors } from 'formik';
import { IFilter, KeysFilterBrand } from '../lib/filterBrandSchema';

interface IQuickSearchBrandProps {
  errors: FormikErrors<IFilter>;
  values: IFilter;
  setFieldValue: (
    field: KeysFilterBrand,
    value: number | string | Date,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IFilter>>;
  dirty: boolean;
}

const QuickSearchBrand: FC<IQuickSearchBrandProps> = ({ values, setFieldValue, errors, dirty }) => {
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
        {(dirty || errors.commoditySearch) && (
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
              <SelectItem value={'1-vendoer-pack'}>Vendor Packing</SelectItem>
              <SelectItem value={'2-warehouse-pack'}>Warehouse Packing</SelectItem>
              <SelectItem value={'3-brand-packing'}>Brand Packing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.packSizeSearch && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packSizeSearch}</p>}
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
              <SelectItem value={'pack-style-1'}>Pack Style 1</SelectItem>
              <SelectItem value={'pack-style-2'}>Pack Style 2</SelectItem>
              <SelectItem value={'pack-style-3'}>Pack Style 3</SelectItem>
              <SelectItem value={'pack-style-4'}>Pack Style 4</SelectItem>
              <SelectItem value={'pack-style-5'}>Pack Style 5</SelectItem>
              <SelectItem value={'pack-style-6'}>Pack Style 6</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.packStyleSearch && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.packStyleSearch}</p>}
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
              <SelectItem value={'grade-1'}>US-DOT 1</SelectItem>
              <SelectItem value={'grade-2'}>US-DOT 2</SelectItem>
              <SelectItem value={'grade-3'}>US-DOT 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.gradeSearch && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.gradeSearch}</p>}
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
        {errors.quantitySearch && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.quantitySearch}</p>}
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
        {errors.deliverDateSearch && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.deliverDateSearch}</p>}
      </div>
    </section>
  );
};

export { QuickSearchBrand };
