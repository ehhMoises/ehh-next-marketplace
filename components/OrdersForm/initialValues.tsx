import { PurchaseOrderDetail, StatusOrderType, StatusOrderTypeId } from '@/models/purchase-order';

export const initialValues: PurchaseOrderDetail = {
  id: '',
  transactionNumber: 0,
  invoiceNumber: '',
  poNumber: '',
  buyerAccount: {
    id: '',
    name: '',
    contactPhone: '',
  },
  sellerAccount: {
    id: '',
    name: '',
    contactPhone: '',
  },
  buyerUser: {
    id: '',
    email: '',
  },
  stock: {
    id: '',
    startDate: '',
    endDate: '',
    standardPrice: 0,
    availableQuantity: 0,
    header: '',
    subHeader: '',
  },
  quantity: 0,
  price: 0,
  deliveryDateUtc: '',
  status: {
    id: 100,
    name: StatusOrderType.Pending,
  },
  total: 0,
};

export const OrderStatusLabels: Record<StatusOrderType, string> = {
  Pending: 'Pending',
  InProcess: 'In Process',
  Delivered: 'Delivered',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
};

export const OrderStatusName: Record<StatusOrderTypeId, StatusOrderType> = {
  [StatusOrderTypeId.Pending]: StatusOrderType.Pending,
  [StatusOrderTypeId.InProcess]: StatusOrderType.InProcess,
  [StatusOrderTypeId.Delivered]: StatusOrderType.Delivered,
  [StatusOrderTypeId.Completed]: StatusOrderType.Completed,
  [StatusOrderTypeId.Cancelled]: StatusOrderType.Cancelled,
};
