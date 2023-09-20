'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched, useFormik } from 'formik';
import { FC, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PurchaseOrderDetail } from '@/models/purchase-order';

interface IOrderProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  touched: FormikTouched<PurchaseOrderDetail>;
  errors: FormikErrors<PurchaseOrderDetail>;
  isButtonDisabled: boolean;
  isNew: boolean;
  values: PurchaseOrderDetail;
  currentRootPath: string;
}

export const OrderFormComponent: FC<IOrderProps> = ({
  handleSubmit,
  getFieldProps,
  touched,
  errors,
  isButtonDisabled,
  isNew,
  values,
  currentRootPath,
}) => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="bg-orange-500 p-4 text-white">Order Detail</div>
      <div className="bg-gray-300 flex flex-col p-4">
        <div className="font-bold">{values.buyerAccount.name}</div>
      </div>
      <div className="p-4 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Label htmlFor="name">Transaction Number:</Label>
            <Input id="name" {...getFieldProps('transactionNumber')} placeholder="transactionNumber" disabled />
            {touched.transactionNumber && errors.transactionNumber && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.transactionNumber}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="deliveryDateUtc">Delivery Date:</Label>
            <Input id="deliveryDateUtc" {...getFieldProps('deliveryDateUtc')} disabled />
            {touched.deliveryDateUtc && errors.deliveryDateUtc && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.deliveryDateUtc}</p>
            )}
          </div>
          <div className="pb-4">
            <Label htmlFor="status">Status:</Label>
            <Input id="status" {...getFieldProps('status.name')} disabled />
          </div>
          <div className="pb-4">
            <Label htmlFor="status">Quantity:</Label>
            <Input id="status" type="number" {...getFieldProps('quantity')} />
          </div>
          <div className="pb-4">
            <Label htmlFor="status">Price:</Label>
            <Input id="status" type="number" {...getFieldProps('price')} />
            {touched.price && errors.price && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.price}</p>}
          </div>
          <div className="pb-4">
            <Label htmlFor="status">Total Count:</Label>
            <Input id="status" {...getFieldProps('total')} disabled />
          </div>
          <div className="flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={() => router.push(currentRootPath)} className="mr-4">
              Cancel
            </Button>
            <Button type="submit" disabled={isButtonDisabled}>
              {isNew ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
