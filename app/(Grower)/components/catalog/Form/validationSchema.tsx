import * as Yup from 'yup';

export const validationSchema = (isNew: boolean) => {
  let brandIdSchema = Yup.string();
  let gradeIdSchema = Yup.string();
  let packStyleIdSchema = Yup.string();
  let packSizeIdSchema = Yup.string();

  if (isNew) {
    brandIdSchema = brandIdSchema.required("Brand it's Required");
    gradeIdSchema = gradeIdSchema.required("Grade it's Required");
    packStyleIdSchema = packStyleIdSchema.required("Pack Style it's Required");
    packSizeIdSchema = packSizeIdSchema.required("Pack Size it's Required");
  }

  return Yup.object().shape({
    brandId: brandIdSchema,
    gradeId: gradeIdSchema,
    packStyleId: packStyleIdSchema,
    packSizeId: packSizeIdSchema,
    startDate: Yup.date().required("Start Date It's Required"),
    endDate: Yup.date().required("End Date It's Required"),
    minPrice: Yup.number().required("Minimum Price it's Required").min(1),
    totalQuantity: Yup.number().required("Total Quantity It's Required"),
    reservedQuantity: Yup.number().required("Reseverd Quantity it's Required"),
    standardPrice: Yup.number()
      .required("Standard Price it's Required")
      .when(['minPrice'], ([_minPrice], schema) => {
        const minPrice = parseInt(_minPrice, 10);

        return schema.min(minPrice, 'Standard Price must be equal or higher to Min price.');
      }),
  });
};
