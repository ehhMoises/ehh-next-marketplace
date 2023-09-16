export interface SearchParamsPotentialGrowers {
  commodity: string;
  growingMethod: string;
  variety: string;
  quantity: string;
  deliveryDateUtc: string;
}

export interface QuickSearchParamsPotentialGrowers {
  commodity: string;
  packStyleId: string;
  packSizeId: string;
  quantity: string;
  deliveryDateUtc: string;
  grade: string;
}
