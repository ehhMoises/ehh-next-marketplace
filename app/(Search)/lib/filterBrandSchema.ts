import * as Yup from 'yup';

const FilterBrandSchema = Yup.object().shape({
  commodity: Yup.string().required('Commodity Required'),
  packSize: Yup.string().required('Pack Size Required'),
  quantity: Yup.number().required('Quantity is Required'),
  deliverDate: Yup.string().required('Deliver Date is Required'),
});

export type FilterBrand = Yup.InferType<typeof FilterBrandSchema>;
export type KeysFilterBrand = keyof FilterBrand;
export type SearchBrandValidationError = Partial<Record<KeysFilterBrand, string[]>>;

export default FilterBrandSchema;
