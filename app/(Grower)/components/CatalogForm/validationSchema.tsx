import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  brandId: Yup.string().required(),
  gradeId: Yup.string().required(),
  packStyled: Yup.string().required(),
  packSizeId: Yup.string().required(),
  startDate: Yup.date().required(),
  endDate: Yup.date().required(),
  minPrice: Yup.number().required().min(1),
  totalQuantity: Yup.number().required(),
  reservedQuantity: Yup.number().required(),
});
