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
    id: StatusOrderTypeId.Pending,
    name: StatusOrderType.Pending,
  },
  total: 0,
};

export const OrderStatusName: Record<StatusOrderTypeId, StatusOrderType> = {
  [StatusOrderTypeId.Pending]: StatusOrderType.Pending,
  [StatusOrderTypeId.InProcess]: StatusOrderType.InProcess,
  [StatusOrderTypeId.Delivered]: StatusOrderType.Delivered,
  [StatusOrderTypeId.Completed]: StatusOrderType.Completed,
  [StatusOrderTypeId.Cancelled]: StatusOrderType.Cancelled,
};
