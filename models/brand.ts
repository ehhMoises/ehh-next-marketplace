export interface Brand<GrowingMethodType = number> {
  id: string;
  name: string;
  description: string;
  commodity: string;
  variety: string;
  subVariety: string;
  plu: string;
  growingMethod: GrowingMethodType;
  isActive: boolean;
}
