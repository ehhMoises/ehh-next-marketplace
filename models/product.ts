import { GrowingMethod } from './growingMethod';

export enum FreightPaymentsType {
  Origin = 'Origin',
  Destination = 'Destination',
}

export enum FreightPaymentsTypeId {
  Origin = 100,
  Destination = 200,
}

export interface ProductPresentation {
  id: string;
  commodity: string;
  variety: string;
  growingMethod: GrowingMethod;
  imageUrl: string;
}

export interface QuickSearchOptions {
  commodities: string[];
  varieties: string[];
  packStyles: string[];
  packSizes: string[];
  grades: string[];
  addresses: string[];
}
