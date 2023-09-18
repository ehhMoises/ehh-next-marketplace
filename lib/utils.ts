import { ProductPresentation } from '@/models/product';
import { SortingCommodityType } from '@/models/user-interface';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortingCommodity = (products: ProductPresentation[], sortType: SortingCommodityType) => {
  return [...products].sort((a, b) => {
    if (a.commodity > b.commodity && sortType === SortingCommodityType.DESCENDING) {
      return 1;
    } else if (a.commodity < b.commodity && sortType === SortingCommodityType.ASCENDING) {
      return -1;
    }

    return 0;
  });
};

export const sortingPlaceholderCommodity = (products: ProductPresentation[], sortType: SortingCommodityType) => {
  return [...products].sort((a, b) => {
    if (a.commodity < b.commodity && sortType === SortingCommodityType.ASCENDING) {
      return 1;
    } else if (a.commodity > b.commodity && sortType === SortingCommodityType.DESCENDING) {
      return -1;
    }

    return 0;
  });
};
