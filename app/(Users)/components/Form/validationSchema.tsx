import * as Yup from 'yup';
import yupPassword from 'yup-password';

// Add the yupPassword plugin to Yup
yupPassword(Yup);

export const validationSchema = Yup.object().shape({
  id: Yup.string(),
  accountId: Yup.string(),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .password()
    .minLowercase(5)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .required('Password is required'),
  position: Yup.string(),
  status: Yup.number().required('Status is required'),
  type: Yup.number().required('Type is required'),
});
