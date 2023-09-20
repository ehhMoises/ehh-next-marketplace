import { PurchaseOrderDetail, StatusOrderType } from '@/models/purchase-order';

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
