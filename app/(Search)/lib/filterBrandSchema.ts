import * as Yup from 'yup';

export interface IFilter<DeliverDateType = Date, QuantityType = string> {
  commodity?: string;
  packSize?: string;
  packStyle?: string;
  quantity?: QuantityType;
  grade?: string;
  deliverDate?: DeliverDateType;
}

const FilterBrandValidationSchema = Yup.object().shape({
  commodity: Yup.string().required("Commodity it's Required"),
  packSize: Yup.string().required("Pack Size it's Required"),
  packStyle: Yup.string().required("Pack Style it's Required"),
  quantity: Yup.string().required("Quantity Needed it's Required"),
  grade: Yup.string().required("Grade it's Required"),
  deliverDate: Yup.date().required("Deliver Date it's Required"),
});

export const filterInitialValues: IFilter = {
  commodity: undefined,
  packSize: undefined,
  packStyle: undefined,
  grade: undefined,
  quantity: undefined,
  deliverDate: undefined,
};

export type FilterBrand = Yup.InferType<typeof FilterBrandValidationSchema>;
export type KeysFilterBrand = keyof FilterBrand;
export type SearchBrandValidationError = Partial<Record<KeysFilterBrand, string[]>>;

export default FilterBrandValidationSchema;
