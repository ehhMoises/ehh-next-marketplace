'use client';

import { FC } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import style from './Register.module.css';
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';
import SignUpSchema, { signUpInitialValues } from './signUpSchema';

interface SignUpFormProps {
  onNewUserCreated: () => void;
  onSelectConfirmationCode: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({ onNewUserCreated, onSelectConfirmationCode }) => {
  const { handleChange, handleSubmit, errors, touched, dirty } = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log('values', values);
      onNewUserCreated();
    },
  });

  const isEmailInvalid = (errors.email && touched.email) || dirty;
  const isPasswordInvalid = (errors.password && touched.password) || dirty;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4 px-2 md:px-10">
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
        <div className="grid grid-cols-1">
          <Input
            id="password"
            name="password"
            type="password"
            className={cn(
              style.signUp,
              'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Password"
            onChange={handleChange}
          />
          {isPasswordInvalid && <p className="text-zinc-300 mt-3 text-xl">{errors.password}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="w-full flex flex-row justify-center">
          <Button
            className="text-white text-lg text-center"
            variant={'link'}
            onClick={() => {
              onSelectConfirmationCode();
            }}
          >
            Confirmation Code
          </Button>
        </div>

        <div className="px-0 sm:px-10 w-full">
          <Button type="submit" className="w-full h-20">
            <span className="text-xl">Sign Up</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export { SignUpForm };
