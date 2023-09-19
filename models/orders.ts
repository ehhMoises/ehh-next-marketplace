import { StatusOrderType, StatusOrderTypeId } from './purchase-order';

export type IOrdersTableStatus = {
  id: StatusOrderTypeId;
  name: StatusOrderType;
};

export type IMyOrdersTable = {
  id: string;
  transactionNumber: string;
  deliveryDateUtc: string | Date | null;
  status: IOrdersTableStatus;
};
