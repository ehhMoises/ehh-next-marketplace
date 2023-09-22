import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  id: Yup.string().required('Id is required'),
  accountId: Yup.string().required('Account Id is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string(),
  position: Yup.string(),
  status: Yup.number().required('Status is required'),
  type: Yup.number().required('Type is required'),
});

// providerNumber: Yup.string().when('providerName', {
//   is: (providerName: string) => !isEmpty(providerName),
//   then: Yup.string().required('Provider number is required'),
// }),
