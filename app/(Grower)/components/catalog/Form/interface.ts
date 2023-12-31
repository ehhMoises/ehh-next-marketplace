export interface IGrowerCatalog  {
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