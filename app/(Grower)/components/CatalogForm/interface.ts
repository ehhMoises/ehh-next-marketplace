export interface IGrowerCatalog  {
  commodity: string;
  brandId: string;
  gradeId: string;
  packStyled: string;
  packSizeId: string;
  startDate: string | Date | null;
  endDate: string | Date | null;
  standardPrice: number;
  minPrice: number;
  totalQuantity: number;
  reservedQuantity: number;
}