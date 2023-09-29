import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  price: Yup.number().required('Price is required').min(1),
  status: Yup.object()
    .shape({
      id: Yup.number(),
      name: Yup.string(),
    })
    .required('Status is required'),
});
