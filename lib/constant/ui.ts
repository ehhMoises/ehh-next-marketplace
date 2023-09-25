import { FreightPaymentsTypeId } from '@/models/product';

export enum ProductCardMode {
  PRESENTATIONAL = 'PRESENTATIONAL',
  ON_FILTER = 'ON_FILTER',
  FILTERED = 'FILTERED',
}

export const LabelsOptionFreightPayment: Record<number, string> = {
  [FreightPaymentsTypeId.Origin]: 'FOB Origin',
  [FreightPaymentsTypeId.Destination]: 'FOB Destination',
};
