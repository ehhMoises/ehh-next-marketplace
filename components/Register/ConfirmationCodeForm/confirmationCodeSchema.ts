import * as Yup from 'yup';

const ConfirmationCodeSchemaSchema = Yup.object().shape({
  email: Yup.string().required("Email it's Required"),
  code: Yup.string().required("Code it's Required"),
});

export const confirmationCodeInitialValues: ConfirmationCodeSchemaSchemaModel = {
  email: '',
  code: '',
};

export type ConfirmationCodeSchemaSchemaModel = Yup.InferType<typeof ConfirmationCodeSchemaSchema>;
export type KeysConfirmationCodeSchemaSchema = keyof ConfirmationCodeSchemaSchemaModel;
export type ConfirmationCodeSchemaSchemaValidationError = Partial<Record<KeysConfirmationCodeSchemaSchema, string[]>>;

export default ConfirmationCodeSchemaSchema;
