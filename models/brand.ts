import { GrowingMethod } from './growingMethod';

export interface Brand {
  id: string;
  name: string;
  description: string;
  commodity: string;
  variety: string;
  subVariety: string;
  plu: string;
  growingMethod: GrowingMethod;
  isActive: boolean;
}
