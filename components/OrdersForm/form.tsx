'use client';

import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { FC, FormEvent, Fragment } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { OrderStatusLabels, PurchaseOrderDetail, StatusOrderType, StatusOrderTypeId } from '@/models/purchase-order';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { AccountType } from '@/models/account-user';
import { OrderStatusName } from './initialValues';

interface IOrderProps {
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<PurchaseOrderDetail>> | Promise<void>;
  touched: FormikTouched<PurchaseOrderDetail>;
  errors: FormikErrors<PurchaseOrderDetail>;
  isButtonDisabled: boolean;
  isNew: boolean;
  values: PurchaseOrderDetail;
  currentRootPath: string;
  accountType?: AccountType;
}

export const OrderFormComponent: FC<IOrderProps> = ({
  handleSubmit,
  getFieldProps,
  setFieldValue,
  touched,
  errors,
  isButtonDisabled,
  isNew,
  values,
  currentRootPath,
  accountType,
}) => {
  const router = useRouter();

  const changeOrderStatusHandler = (_statusId: string) => {
    const statusId = _statusId as unknown as StatusOrderTypeId;

    const selectedStatus = {
      id: statusId,
      name: OrderStatusName[statusId],
    };

    setFieldValue('status', selectedStatus);
  };

  return (
    <div className="p-4">
      <div className="bg-marketplace p-4 text-white">Order Detail</div>
      <div className="bg-gray-300 flex flex-col p-4">
        <div className="font-bold">{values.buyerAccount.name}</div>
      </div>
      <div className="p-4 bg-marketplace-accent-2">
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Label htmlFor="name">Transaction Number:</Label>
            <Input id="name" {...getFieldProps('transactionNumber')} placeholder="transactionNumber" disabled />
            {touched.transactionNumber && errors.transactionNumber && (
              <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.transactionNumber}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row pb-4 gap-x-4 gap-y-4">
            <div className="w-full md:w-6/12 flex flex-col">
              <Label htmlFor="status">Order Status:</Label>
              <Select name="status" onValueChange={changeOrderStatusHandler} value={values.status.id.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {accountType === AccountType.Grower && (
                      <Fragment key="growerStatusPortion">
                        <SelectItem key={StatusOrderTypeId.Pending} value={StatusOrderTypeId.Pending.toString()}>
                          <p className="capitalize">{OrderStatusLabels[StatusOrderType.Pending]}</p>
                        </SelectItem>

                        <SelectItem key={StatusOrderTypeId.InProcess} value={StatusOrderTypeId.InProcess.toString()}>
                          <p className="capitalize">{OrderStatusLabels[StatusOrderType.InProcess]}</p>
                        </SelectItem>

                        <SelectItem key={StatusOrderTypeId.Delivered} value={StatusOrderTypeId.Delivered.toString()}>
                          <p className="capitalize">{OrderStatusLabels[StatusOrderType.Delivered]}</p>
                        </SelectItem>
                      </Fragment>
                    )}

                    {accountType === AccountType.Buyer && (
                      <Fragment key="buyerStatusPortion">
                        <SelectItem key={StatusOrderTypeId.Completed} value={StatusOrderTypeId.Completed.toString()}>
                          <p className="capitalize">{OrderStatusLabels[StatusOrderType.Completed]}</p>
                        </SelectItem>

                        <SelectItem key={StatusOrderTypeId.Cancelled} value={StatusOrderTypeId.Cancelled.toString()}>
                          <p className="capitalize">{OrderStatusLabels[StatusOrderType.Cancelled]}</p>
                        </SelectItem>
                      </Fragment>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-6/12">
              <Label htmlFor="deliveryDateUtc">Delivery Date:</Label>
              <Input id="deliveryDateUtc" {...getFieldProps('deliveryDateUtc')} disabled />
              {touched.deliveryDateUtc && errors.deliveryDateUtc && (
                <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.deliveryDateUtc}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row pb-4 gap-x-4 gap-y-4">
            <div className="w-full md:w-4/12">
              <Label htmlFor="status">Quantity:</Label>
              <Input id="status" type="number" {...getFieldProps('quantity')} />
            </div>

            <div className="w-full md:w-4/12">
              <Label htmlFor="status">Price:</Label>
              <Input id="status" type="number" {...getFieldProps('price')} disabled />
              {touched.price && errors.price && <p className="text-red-400 ml-1.5 mt-0.5 text-sm">{errors.price}</p>}
            </div>

            <div className="w-full md:w-4/12">
              <Label htmlFor="status">Total Count:</Label>
              <Input id="status" {...getFieldProps('total')} disabled />
            </div>
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
