import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  commodity: Yup.string().required('Commodity is required'),
  variety: Yup.string().required('Variety is required'),
  subVariety: Yup.string().label('Sub Variety'),
  plu: Yup.string().required('PLU is required'),
  growingMethod: Yup.number().required('Growing Method is required'),
});
