'use client';

import { Dispatch, FC } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import style from './SignUp.module.css';
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';
import SignUpSchema, { signUpInitialValues } from './signUpSchema';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';
import { useSignUp } from '@/lib/hooks/auth';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SignUpFormProps {
  onNewUserCreated: Dispatch<string>;
  onSelectConfirmationCode: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({ onNewUserCreated, onSelectConfirmationCode }) => {
  const { isSigningUp, register, error } = useSignUp();
  const { setFieldTouched, setFieldValue, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, helper) => {
      try {
        const isSuccessRegister = await register({
          accountType: Number.parseInt(values.accountType, 10),
          companyName: values.companyName,
          email: values.email,
          password: values.password,
        });

        if (isSuccessRegister) {
          helper.resetForm();
          onNewUserCreated(values.email);
        }

        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
  });

  const isEmailInvalid = errors.email && touched.email;
  const isPasswordInvalid = errors.password && touched.password;
  const isCompanyNameInvalid = errors.companyName && touched.companyName;
  const isaccountTypeInvalid = errors.accountType && touched.accountType;

  return (
    <form onSubmit={handleSubmit}>
      {!!error?.errors?.Message && (
        <section className="flex flex-col gap-y-1">
          <p className="text-stone-200 text-xl text-center">There was an error</p>
          <p className="text-stone-200 text-xl text-center">{error.errors.Message[0]}</p>
        </section>
      )}

      <div className="grid gap-y-4 py-4 px-2 md:px-10">
        <div className="grid grid-cols-1">
          <Input
            name="email"
            type="text"
            className={cn(
              style.signUp,
              'w-full h-16 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Email"
            onChange={handleChange}
          />
          {isEmailInvalid && <p className="text-zinc-300 mt-3">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1">
          <Input
            id="password"
            name="password"
            type="password"
            className={cn(
              style.signUp,
              'w-full h-16 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {isPasswordInvalid && <p className="text-zinc-300 mt-3">{errors.password}</p>}
        </div>

        <div className="grid grid-cols-1">
          <Input
            name="companyName"
            type="text"
            className={cn(
              style.signUp,
              'w-full h-16 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Company Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {isCompanyNameInvalid && <p className="text-zinc-300 mt-3">{errors.companyName}</p>}
        </div>

        <div className="grid grid-cols-1">
          <Select name="accountType" onValueChange={(value) => setFieldValue('accountType', value)}>
            <SelectTrigger className="h-16 flex justify-center bg-transparent text-white text-lg">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent
              className="w-full bg-opacity-25 border-2 text-xl text-center"
              onFocus={() => {
                setFieldTouched('accountType', true);
              }}
            >
              <SelectGroup>
                {[
                  {
                    id: 100,
                    name: 'Grower',
                  },
                  {
                    id: 200,
                    name: 'Buyer',
                  },
                ].map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {isaccountTypeInvalid && <p className="text-zinc-300 mt-3">{errors.accountType}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="px-0 sm:px-10 w-full">
          <Button type="submit" className="w-full h-16" disabled={isSigningUp}>
            {isSigningUp && (
              <div className="flex justify-center w-full items-center pl-8 pt-3">
                <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.MEDIUM} color="white" />
              </div>
            )}
            {!isSigningUp && <span className="text-xl">Sign Up</span>}
          </Button>
        </div>

        <div className="w-full flex flex-row justify-center">
          <Button
            type="button"
            className="text-white text-lg text-center"
            variant={'link'}
            onClick={() => {
              onSelectConfirmationCode();
            }}
          >
            I already have a confirmation code
          </Button>
        </div>
      </div>
    </form>
  );
};

export { SignUpForm };
