import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  commodity: Yup.string().required(),
  variety: Yup.string().required(),
  subVariety: Yup.string().required(),
  plu: Yup.string().required(),
  growingMethod: Yup.number().required(),
});
