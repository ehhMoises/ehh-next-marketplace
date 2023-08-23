'use client';

import { FC } from 'react';
import ModalTransparent from '../ModalTransparent';
import { Input } from '../ui/input';
import { DialogDescription, DialogFooter, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import style from './SignIn.module.css';
import { cn } from '@/lib/utils';

interface SignInProps {
  openModal: boolean;
  onOpenModal?: (open: boolean) => void;
}
const SignIn: FC<SignInProps> = ({ onOpenModal, openModal }) => {
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
      <div className="grid gap-4 py-4 px-2 md:px-10">
        <div className="grid grid-cols-1">
          <Input
            id="username"
            name="username"
            className={cn(
              style.signIn,
              'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="User Name"
          />
        </div>
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
          />
        </div>
      </div>
      <DialogFooter>
        <div className="px-0 sm:px-10 w-full">
          <Button className="w-full h-20" type="submit">
            <span className="text-xl">Sign In</span>
          </Button>
        </div>
      </DialogFooter>
    </ModalTransparent>
  );
};

export default SignIn;
