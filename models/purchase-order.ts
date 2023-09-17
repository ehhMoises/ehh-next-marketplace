export enum StatusOrderType {
  Pending = 'Pending',
  InProcess = 'InProcess',
  Delivered = 'Delivered',
  Completed = 'Completed',
}

export enum StatusOrderTypeId {
  Pending = 100,
  InProcess = 200,
  Delivered = 300,
  Completed = 400,
}

export interface PurchaseOrderList {
  id: number;
  transactionNumber: number;
  deliveryDateUtc: string;
  status: {
    id: StatusOrderTypeId;
    name: StatusOrderType;
  };
}

export interface PurchaseOrderDetail {
  id: string;
  transactionNumber: number;
  invoiceNumber: string;
  poNumber: string;
  buyerAccount: {
    id: string;
    name: string;
    contactPhone: string;
  };
  sellerAccount: {
    id: string;
    name: string;
    contactPhone: string;
  };
  buyerUser: {
    id: string;
    email: string;
  };
  stock: {
    id: string;
    startDate: string;
    endDate: string;
    standardPrice: number;
    availableQuantity: number;
    header: string;
    subHeader: string;
  };
  quantity: number;
  price: number;
  deliveryDateUtc: string;
  status: {
    id: StatusOrderTypeId;
    name: StatusOrderType;
  };
  total: number;
}
