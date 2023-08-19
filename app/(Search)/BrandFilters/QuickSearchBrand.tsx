'use client';

import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import JSCookie from 'js-cookie';

const QuickSearchBrand: FC = () => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    JSCookie.set('access-token', 'SuperAccessTokenFake');
  }, []);

  return (
    <section className="flex flex-col gap-y-3">
      <div key="commoditySearch">
        <Select name="commodity">
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
      </div>

      <div key="packSizeSearch">
        <Select name="packSize">
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
      </div>

      <div key="packStyleSearch">
        <Select name="packStyle">
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
      </div>

      <div key="gradeSearch">
        <Select name="grade">
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
      </div>

      <div key="quantitySearch">
        <Input name="quantity" type="number" min={1} placeholder="Enter Quantity Needed" />
      </div>

      <div key="deliverDateSearch" className="flex flex-row items-center gap-x-1">
        <Popover>
          <PopoverTrigger className="rounded-none" asChild>
            <Button
              variant={'outline'}
              className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              {date ? format(date, 'PPP') : <span>Deliver Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <CalendarIcon size={42} className="text-stone-400" />
      </div>
    </section>
  );
};

export { QuickSearchBrand };
