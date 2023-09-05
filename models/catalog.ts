export interface ICatalog {
  brandId: string;
  gradeId: string;
  packStyleId: string;
  packSizeId: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
  standardPrice: number;
  minPrice: number;
  totalQuantity: number;
  reservedQuantity: number;
}

export interface Catalog extends ICatalog {
  id: string;
}

export interface ICatalogUpdate {
  id: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
  standardPrice: number;
  minPrice: number;
  totalQuantity: number;
  reservedQuantity: number;
}

export interface StockCatalog {
  standardPrice: number;
  id: string;
  startDate: string;
  endDate: string;
  minPrice: number;
  totalQuantity: number;
  reservedQuantity: number;
  header: string;
  subHeader: string;
}
