export interface NewCartItemBody {
  stockId: string;
  quantity: number;
  deliveryDateUtc: string;
}

export interface ShoppingCart {
  id: string;
  quantity: number;
  deliveryDateUtc: string;
  stock: {
    id: string;
    startDate: string;
    endDate: string;
    standardPrice: number;
    availableQuantity: number;
    header: string;
    subHeader: string;
    account: {
      id: string;
      name: string;
      logoUrl: string;
    };
  };
}
