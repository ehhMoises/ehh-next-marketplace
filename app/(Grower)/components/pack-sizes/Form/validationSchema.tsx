import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  unitOfMeasure: Yup.string().required('Unit of measure is required'),
  abbreviation: Yup.string(),
  min: Yup.number().required(),
  max: Yup.number().required(),
  packStyleId: Yup.string().required('Pack style is required'),
});
