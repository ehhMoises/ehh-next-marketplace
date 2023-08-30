import * as Yup from 'yup';

const emailRegExp =
  // eslint-disable-next-line no-useless-escape -- Eslint was complaining about '\' in this regex
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Email it's Required").matches(emailRegExp, {
    message: 'Email is Invalid',
  }),
  password: Yup.string().required("Password it's Required"),
  companyName: Yup.string().required("Company name it's Required"),
  accountType: Yup.string().required("Account type it's Required"),
});

export const signUpInitialValues: SignUpModel = {
  email: '',
  password: '',
  companyName: '',
  accountType: '',
};

export type SignUpModel = Yup.InferType<typeof SignUpSchema>;
export type KeysSignUp = keyof SignUpModel;
export type SignUpValidationError = Partial<Record<KeysSignUp, string[]>>;

export default SignUpSchema;
