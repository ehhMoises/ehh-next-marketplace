export interface IBrand<GrowingMethodType = number> {
  name: string;
  description: string;
  commodity: string;
  variety: string;
  subVariety: string;
  plu: string;
  growingMethod: GrowingMethodType;
}

export interface Brand<GrowingMethodType = number> extends IBrand<GrowingMethodType> {
  id: string;
  isActive: boolean;
}
