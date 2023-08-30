'use client';

import { FC, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import style from '../Register.module.css';
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';
import ConfirmationCodeSchemaSchema, { confirmationCodeInitialValues } from './confirmationCodeSchema';
import { useConfirmationCode, useResendCode } from '@/lib/hooks/auth';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';

interface ConfirmationCodeFormProps {
  emailFromSignUp?: string;
  onSuccessConfirmation: () => void;
}

const ConfirmationCodeForm: FC<ConfirmationCodeFormProps> = ({ emailFromSignUp, onSuccessConfirmation }) => {
  const { isConfirmingCode, confirm, error } = useConfirmationCode();
  const { isResendingCode, resendCode, error: errorResendCode } = useResendCode();
  const { handleChange, setFieldValue, handleSubmit, errors, touched, values } = useFormik({
    initialValues: confirmationCodeInitialValues,
    validationSchema: ConfirmationCodeSchemaSchema,
    onSubmit: async (values, helpers) => {
      try {
        const isSuccessConfirmed = await confirm({
          email: values.email,
          code: values.code,
        });
        if (isSuccessConfirmed) {
          helpers.resetForm();
          onSuccessConfirmation();
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
  });

  useEffect(() => {
    if (emailFromSignUp) {
      setFieldValue('email', emailFromSignUp);
    }
  }, [emailFromSignUp, setFieldValue]);

  const isEmailInvalid = errors.email && touched.email;
  const isCodeInvalid = errors.code && touched.code;

  const resendCodeHandler = () => {
    try {
      resendCode({ email: values.email });
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      {!!error?.errors?.Message && (
        <section className="flex flex-col gap-y-1">
          <p className="text-stone-200 text-xl text-center">There was an error</p>
          <p className="text-stone-200 text-xl text-center">{error.errors.Message[0]}</p>
        </section>
      )}

      {!!errorResendCode?.errors?.Email ||
        (!!errorResendCode?.errors?.Message && (
          <section className="flex flex-col gap-y-1">
            <p className="text-stone-200 text-xl text-center">There was an error</p>
            {errorResendCode.errors.Email && (
              <p className="text-stone-200 text-xl text-center">{errorResendCode.errors.Email[0]}</p>
            )}
            {errorResendCode.errors.Message && (
              <p className="text-stone-200 text-xl text-center">{errorResendCode.errors.Message[0]}</p>
            )}
          </section>
        ))}

      {!emailFromSignUp && (
        <div className="grid gap-x-4 py-4 px-2 md:px-10">
          <div className="grid grid-cols-1">
            <Input
              name="email"
              type="text"
              className={cn(
                style.signUp,
                'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
              )}
              placeholder="Email"
              onChange={handleChange}
            />
            {isEmailInvalid && <p className="text-zinc-300 mt-3 text-xl">{errors.email}</p>}
          </div>
        </div>
      )}

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

      <div className="flex flex-col gap-y-2">
        <div className="w-full flex flex-row justify-center">
          {!isResendingCode && error && (
            <Button
              type="button"
              className="text-white text-lg text-center"
              variant={'link'}
              onClick={resendCodeHandler}
            >
              Resend Code
            </Button>
          )}

          {isResendingCode && (
            <div className="flex flex-col justify-center w-full items-center pl-8 pt-3 gap-y-4">
              <p className="text-zinc-300 mt-3 text-xl">Resending...</p>
              <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.MEDIUM} color="white" />
            </div>
          )}
        </div>

        <div className="px-0 sm:px-10 w-full">
          <Button type="submit" className="w-full h-20" disabled={isConfirmingCode || isResendingCode}>
            {isConfirmingCode && (
              <div className="flex justify-center w-full items-center pl-8 pt-3">
                <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.MEDIUM} color="white" />
              </div>
            )}
            {!isConfirmingCode && <span className="text-xl">Confirm</span>}
          </Button>
        </div>
      </div>
    </form>
  );
};

export { ConfirmationCodeForm };
