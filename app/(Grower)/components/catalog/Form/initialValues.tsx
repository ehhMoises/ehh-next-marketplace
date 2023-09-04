import { ICatalog } from '@/models/catalog';

export const initialValues: ICatalog = {
  brandId: '',
  gradeId: '',
  packStyleId: '',
  packSizeId: '',
  startDate: null,
  endDate: null,
  standardPrice: 0,
  minPrice: 0,
  totalQuantity: 0,
  reservedQuantity: 0,
};
