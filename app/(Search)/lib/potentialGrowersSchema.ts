import * as Yup from 'yup';

const PotentialGrowersSchema = Yup.object().shape({
  commodity: Yup.string().required('Commodity is Required'),
  variety: Yup.string().required('Variety is Required'),
  growingMethod: Yup.number().required('Growing Method is Required'),
  quantity: Yup.number().required('Quantity is Required').min(1),
  deliveryDateUtc: Yup.string().required('Deliver Date is Required'),
  shipToLocation: Yup.string().required('Ship To Location is Required'),
  freightPayment: Yup.string().required("Freight Payment it's Required"),
});

export const getPotentialGrowersInitalValues = ({
  commodity,
  variety,
  growingMethod,
}: {
  commodity: string;
  variety: string;
  growingMethod: number;
}): Partial<PotentialGrowers> => ({
  commodity,
  growingMethod,
  variety,
  quantity: undefined,
  deliveryDateUtc: undefined,
  shipToLocation: undefined,
  freightPayment: undefined,
});

export type PotentialGrowers = Yup.InferType<typeof PotentialGrowersSchema>;
export type KeysPotentialGrowers = keyof PotentialGrowers;
export type PotentialGrowersValidationError = Partial<Record<KeysPotentialGrowers, string[]>>;

export default PotentialGrowersSchema;
