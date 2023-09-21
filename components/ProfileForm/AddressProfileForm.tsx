'use client';

import { FC } from 'react';
import { IAddressAccountBody } from '@/models/account-user';
import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { GrowerProfileFormValues } from './profileForm.utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight } from 'lucide-react';
import styles from './AddressAccordionStyles.module.css';
import { cn } from '@/lib/utils';

interface AddressProfileFormProps {
  addresses: IAddressAccountBody[];
  setValues: (
    values: React.SetStateAction<GrowerProfileFormValues>,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<GrowerProfileFormValues>> | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  errors?: FormikErrors<IAddressAccountBody>[] | undefined;
  touched?: FormikTouched<IAddressAccountBody>[] | undefined;
}

export const AddressProfileForm: FC<AddressProfileFormProps> = ({
  addresses,
  setValues,
  getFieldProps,
  errors,
  touched,
}) => {
  const addFieldHandler = () => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        addresses: [
          ...prevValues.addresses,
          {
            id: null,
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: '',
          },
        ],
      };
    });
  };

  // const removeFieldHandler = (index: number) => {
  //   setValues((prevValues) => {
  //     const newItems = [...prevValues.addresses];
  //     newItems.splice(index, 1);
  //     return { ...prevValues, items: newItems };
  //   });
  // };

  return (
    <Accordion type="multiple">
      {addresses.map((address, index) => {
        const isAddressLine1Invalid = errors && errors[index]?.line1 && touched && touched[index]?.line1;
        const isAddressLine2Invalid = errors && errors[index]?.line2 && touched && touched[index]?.line2;
        const isCityInvalid = errors && errors[index]?.city && touched && touched[index]?.city;
        const isStateInvalid = errors && errors[index]?.state && touched && touched[index]?.state;
        const isZipInvalid = errors && errors[index]?.zip && touched && touched[index]?.zip;

        return (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger className={cn('uppercase  text-white h-9 px-3"', styles['AccordionTrigger'])}>
              <h4 className="text-stone-600">Address {address.line1 ? address.line1 : index + 1}</h4>
            </AccordionTrigger>

            <AccordionContent className={styles['AccordionContent']}>
              <div className="flex flex-col gap-y-5 mt-3.5 px-2" key={index}>
                <div className="grid grid-cols-1">
                  <div className="flex flex-col sm:flex-row w-full items-center">
                    <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="address-line-1">
                      Address:
                    </Label>
                    <Input
                      className="w-full sm:w-9/12"
                      {...getFieldProps(`addresses[${index}].line1`)}
                      type="text"
                      placeholder="Enter Address Line 1"
                    />
                  </div>

                  {isAddressLine1Invalid && (
                    <div className="flex justify-end">
                      <p className="text-red-400 mt-3">{errors[index].line1}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1">
                  <div className="flex flex-col sm:flex-row w-full items-center">
                    <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="address-line-2">
                      Address 2:
                    </Label>
                    <Input
                      className="w-full sm:w-9/12"
                      {...getFieldProps(`addresses[${index}].line2`)}
                      type="text"
                      placeholder="Enter Address Line 2"
                    />
                  </div>

                  {isAddressLine2Invalid && (
                    <div className="flex justify-end">
                      <p className="text-red-400 mt-3">{errors[index].line2}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3.5 grid grid-cols-1">
                  <div className="flex flex-col gap-y-5">
                    <div className="grid grid-cols-1">
                      <div className="flex flex-col sm:flex-row w-full items-center">
                        <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="city">
                          City:
                        </Label>
                        <Input
                          className="w-full sm:w-9/12"
                          {...getFieldProps(`addresses[${index}].city`)}
                          type="text"
                          placeholder="Enter City"
                        />
                      </div>

                      {isCityInvalid && (
                        <div className="flex justify-end">
                          <p className="text-red-400 mt-3">{errors[index].city}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1">
                      <div className="flex flex-col sm:flex-row w-full items-center">
                        <Label className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]" htmlFor="state">
                          State:
                        </Label>
                        <Input
                          className="w-full sm:w-9/12"
                          {...getFieldProps(`addresses[${index}].state`)}
                          type="text"
                          placeholder="Enter State"
                        />
                      </div>

                      {isStateInvalid && (
                        <div className="flex justify-end">
                          <p className="text-red-400 mt-3">{errors[index].state}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1">
                      <div className="flex flex-col sm:flex-row w-full items-center">
                        <Label
                          className="w-full sm:w-3/12 text-[#6c6d6f] font-bold text-[1.1rem]"
                          htmlFor="postal-code"
                        >
                          Postal Code:
                        </Label>
                        <Input
                          className="w-full sm:w-9/12"
                          {...getFieldProps(`addresses[${index}].zip`)}
                          type="text"
                          placeholder="Enter Postal Code"
                        />
                      </div>

                      {isZipInvalid && (
                        <div className="flex justify-end">
                          <p className="text-red-400 mt-3">{errors[index].zip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}

      <Button variant={'link'} className="mt-3.5 hover:text-marketplace " type="button" onClick={addFieldHandler}>
        <span className="text-marketplace font-bold">
          {addresses.length === 0 ? 'Add Address' : 'Add Another Address'}
        </span>
        <ChevronRight className="text-marketplace" size={16} />
      </Button>
    </Accordion>
  );
};
