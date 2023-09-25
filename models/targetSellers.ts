import { GrowingMethod } from './growingMethod';

export interface PotentialGrowersBody {
  commodity: string;
  variety: string;
  growingMethod: number;
  quantity: number;
  freightPayment: number;
  deliveryDateUtc: string;
  shipToLocation: string;
}

export interface QuickSearchPotentialGrowersBody {
  commodity: string;
  packStyle: string;
  packSize: string;
  grade: string;
  quantity: number;
  freightPayment: number;
  deliveryDateUtc: string;
  shipToLocation: string;
}

export interface PotentialGrowers {
  id: string;
  accountId: string;
  startDate: string;
  standardPrice: number;
  shipToLocation: string;
  availableQuantity: number;
  account: {
    id: string;
    logoUrl: string;
    name: string;
  };
  product: {
    brand: {
      id: string;
      commodity: string;
      variety: string;
      subVariety: string;
      growingMethod: GrowingMethod;
    };
    packStyle: {
      id: string;
      name: string;
    };
    packSize: {
      id: string;
      name: string;
    };
    grade: {
      id: string;
      name: string;
    };
  };
  isUnderCart: boolean;
  cartItemId: string | null;
}
