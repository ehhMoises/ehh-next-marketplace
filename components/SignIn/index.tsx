'use client';

import { FC } from 'react';
import ModalTransparent from '../ModalTransparent';
import { Input } from '../ui/input';
import { DialogDescription, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import style from './SignIn.module.css';
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';
import SignInSchema, { signInSchemaInitialValues } from './signInSchema';
import { useSignIn } from '@/lib/hooks/auth';
import { SpinClockwiseLoader } from '../Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '../Loaders/loader-size.constant';

interface SignInProps {
  openModal: boolean;
  onOpenModal?: (open: boolean) => void;
}
const SignIn: FC<SignInProps> = ({ onOpenModal, openModal }) => {
  const { isSigningIn, login, error } = useSignIn();
  const { handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: signInSchemaInitialValues,
    validationSchema: SignInSchema,
    onSubmit: async (values, helpers) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        });
        helpers.resetForm();
        // eslint-disable-next-line no-empty
      } catch (err) {}
    },
  });

  const isEmailInvalid = errors.email && touched.email;
  const isPasswordInvalid = errors.password && touched.password;

  return (
    <ModalTransparent
      open={openModal}
      onOpenChange={onOpenModal}
      className="sm:max-w-[720px] min-h-[30rem]"
      title={<DialogTitle className="text-white  text-[2.5rem] text-center mt-4">Welcome to eHarvestHub</DialogTitle>}
      description={
        <DialogDescription className="text-white text-xl text-center">
          Connecting Growers + Retailers + Carriers
        </DialogDescription>
      }
    >
      <form onSubmit={handleSubmit}>
        {!!error?.errors?.Message && (
          <section className="flex flex-col gap-y-1">
            <p className="text-stone-200 text-xl text-center">There was an error</p>
            <p className="text-stone-200 text-xl text-center">{error.errors.Message[0]}</p>
          </section>
        )}

        <div className="grid gap-x-4 py-4 px-2 md:px-10">
          <div className="grid grid-cols-1">
            <Input
              name="email"
              type="text"
              className={cn(
                style.signIn,
                'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
              )}
              placeholder="Email"
              onChange={handleChange}
            />
            {isEmailInvalid && <p className="text-zinc-300 mt-3 text-xl">{errors.email}</p>}
          </div>
        </div>

        <div className="grid gap-x-4 py-4 px-2 md:px-10">
          <div className="grid grid-cols-1">
            <Input
              id="password"
              name="password"
              type="password"
              className={cn(
                style.signIn,
                'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
              )}
              placeholder="Password"
              onChange={handleChange}
            />
            {isPasswordInvalid && <p className="text-zinc-300 mt-3 text-xl">{errors.password}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="px-0 sm:px-10 w-full">
            <Button type="submit" className="w-full h-20" disabled={isSigningIn}>
              {isSigningIn && (
                <div className="flex justify-center w-full items-center pl-8 pt-3">
                  <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.MEDIUM} color="white" />
                </div>
              )}
              {!isSigningIn && <span className="text-xl">Sign In</span>}
            </Button>
          </div>
        </div>
      </form>
    </ModalTransparent>
  );
};

export default SignIn;
