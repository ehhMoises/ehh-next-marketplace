import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  brandId: Yup.string().required(),
  gradeId: Yup.string().required(),
  packStyleId: Yup.string().required(),
  packSizeId: Yup.string().required(),
  startDate: Yup.date().required(),
  endDate: Yup.date().required(),
  minPrice: Yup.number().required().min(1),
  totalQuantity: Yup.number().required(),
  reservedQuantity: Yup.number().required().max(15, 'Reserved Quantity must be less than or equal to 15.'),
  standardPrice: Yup.number().required().min(10, 'Standard Price must be greater than or equal to 10.'),
});