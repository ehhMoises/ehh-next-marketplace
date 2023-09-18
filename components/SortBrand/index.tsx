'use client';

import { FC, Dispatch } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SortingCommodityType } from '@/models/user-interface';

interface SortCommodityProps {
  onSelectSorting: Dispatch<SortingCommodityType>;
}

const SortBrand: FC<SortCommodityProps> = ({ onSelectSorting }) => {
  return (
    <section className="bg-white h-24 w-full flex flex-row justify-end items-center gap-x-4">
      <div className="text-stone-400 text-lg font-semibold">Sort</div>
      <div className="pr-5 w-64">
        <Select onValueChange={onSelectSorting}>
          <SelectTrigger>
            <SelectValue placeholder="By Commodity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={SortingCommodityType.ASCENDING}>Commodity A - Z</SelectItem>
              <SelectItem value={SortingCommodityType.DESCENDING}>Commodity Z - A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default SortBrand;
