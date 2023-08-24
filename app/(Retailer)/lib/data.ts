export interface IRetailerOrders {
  title: string;
  description: string;
  value: number;
  footer: string;
}

export const data: IRetailerOrders[] = [
  {
    title: 'Pending Orders',
    description: '1 pending order needs PO#',
    value: 2,
    footer: 'Pending Orders',
  },
  {
    title: 'Orders in Fullfillment',
    description: '1 cancelled order needs PO#',
    value: 1,
    footer: 'Orders in Fullfillment',
  },
  {
    title: 'Orders in Transit',
    description: '1 completed order needs PO#',
    value: 1,
    footer: 'Orders in Transit',
  },
  {
    title: 'Messages',
    description: '5 Unread',
    value: 5,
    footer: 'Total Messages',
  }
]