import { GrowingMethod } from './growingMethod';

export interface ProductPresentation {
  id: string;
  commodity: string;
  variety: string;
  growingMethod: GrowingMethod;
  imageUrl: string;
}
