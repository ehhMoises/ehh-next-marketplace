import { GrowingMethod } from "./growingMethod";

export interface IBrand<GrowingMethodType = number> {
  name: string;
  description: string;
  commodity: string;
  variety: string;
  subVariety: string;
  plu: string;
  growingMethod: GrowingMethodType;
}

export interface Brand<GrowingMethodType = number> extends IBrand {
  id: string;
  isActive: boolean;
}
