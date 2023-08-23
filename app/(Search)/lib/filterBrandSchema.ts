import * as Yup from 'yup';

export interface IFilter<DeliverDateType = Date, QuantityType = string> {
  commoditySearch?: string;
  packSizeSearch?: string;
  packStyleSearch?: string;
  quantitySearch?: QuantityType;
  gradeSearch?: string;
  deliverDateSearch?: DeliverDateType;
}

const FilterBrandValidationSchema = Yup.object().shape({
  commoditySearch: Yup.string().required("Commodity it's Required"),
  packSizeSearch: Yup.string().required("Pack Size it's Required"),
  packStyleSearch: Yup.string().required("Pack Style it's Required"),
  quantitySearch: Yup.string().required("Quantity Needed it's Required"),
  gradeSearch: Yup.string().required("Grade it's Required"),
  deliverDateSearch: Yup.date().required("Deliver Date it's Required"),
});

export const filterInitialValues: IFilter = {
  commoditySearch: undefined,
  packSizeSearch: undefined,
  packStyleSearch: undefined,
  gradeSearch: undefined,
  quantitySearch: undefined,
  deliverDateSearch: undefined,
};

export type FilterBrand = Yup.InferType<typeof FilterBrandValidationSchema>;
export type KeysFilterBrand = keyof FilterBrand;
export type SearchBrandValidationError = Partial<Record<KeysFilterBrand, string[]>>;

export default FilterBrandValidationSchema;
