'use client';

import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import style from './Register.module.css';
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';
import ConfirmationCodeSchemaSchema, { confirmationCodeInitialValues } from './confirmationCodeSchema';

interface ConfirmationCodeFormProps {
  onSuccessConfirmation: () => void;
}

const ConfirmationCodeForm: FC<ConfirmationCodeFormProps> = ({ onSuccessConfirmation }) => {
  const { handleChange, handleSubmit, errors, touched, dirty } = useFormik({
    initialValues: confirmationCodeInitialValues,
    validationSchema: ConfirmationCodeSchemaSchema,
    onSubmit: (values) => {
      console.log('values', values);
      onSuccessConfirmation();
    },
  });

  const isCodeInvalid = (errors.code && touched.code) || dirty;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-x-4 py-4 px-2 md:px-10">
        <div className="grid grid-cols-1">
          <Input
            name="code"
            type="text"
            className={cn(
              style.signUp,
              'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Confirmation Code"
            onChange={handleChange}
          />
          {isCodeInvalid && <p className="text-zinc-300 mt-3 text-xl">{errors.code}</p>}
        </div>
      </div>

      <div className="px-0 sm:px-10 w-full">
        <Button type="submit" className="w-full h-20">
          <span className="text-xl">Confirm</span>
        </Button>
      </div>
    </form>
  );
};

export { ConfirmationCodeForm };
