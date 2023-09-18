import { IAccountBody, IAddressAccountBody } from '@/models/account-user';
import * as Yup from 'yup';

const initialValues: IAccountBody & {
  addresses: IAddressAccountBody[];
} = {
  name: '',
  contactName: '',
  contactPhone: '',
  description: '',
  logoUrl: '',
  addresses: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name of Farm it's required"),
  contactName: Yup.string().required("Contact Name it's required"),
  contactPhone: Yup.string().required("Contact Phone it's required"),
  description: Yup.string().required("Description it's required"),
  logoUrl: Yup.string().optional(),
  addresses: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().nullable(),
        line1: Yup.string().required("Line 1 Address it's required"),
        line2: Yup.string(),
        city: Yup.string().required("City it's required"),
        state: Yup.string().required("State it's required"),
        zip: Yup.string().required("Postal Code it's required"),
      })
    )
    .min(1),
});

export type GrowerProfileFormValues = IAccountBody & {
  addresses: IAddressAccountBody[];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  initialValues,
  validationSchema,
};
