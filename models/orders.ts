export type IOrdersTableStatus = {
  id: number;
  name: string;
};

export type IMyOrdersTable = {
  id: string;
  transactionNumber: string;
  deliveryDateUtc: string | Date | null;
  status: IOrdersTableStatus;
};