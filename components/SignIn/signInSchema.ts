import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string().required("Email it's Required"),
  password: Yup.string().required("Password it's Required"),
});

export const signInSchemaInitialValues: SignInSchemaModel = {
  email: '',
  password: '',
};

export type SignInSchemaModel = Yup.InferType<typeof SignInSchema>;
export type KeysSignInSchema = keyof SignInSchemaModel;
export type SignInSchemaValidationError = Partial<Record<KeysSignInSchema, string[]>>;

export default SignInSchema;
