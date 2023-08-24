export interface Catalog {
  id: string;
  brandId: string;
  gradeId: string;
  packStyleId: string;
  packSizeId: string;
  startDate: string;
  endDate: string;
  standardPrice: number;
  minPrice: number;
  totalQuantity: number;
  reservedQuantity: number;
}

export interface StockCatalog {
  id: string;
  startDate: string;
  endDate: string;
  minPrice: number;
  totalQuantity: number;
  reservedQuantity: number;
  header: string;
  subHeader: string;
}
