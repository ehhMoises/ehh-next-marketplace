'use client';

import { FC } from 'react';
import ModalTransparent from '../ModalTransparent';

import { DialogDescription, DialogTitle } from '../ui/dialog';
import { SignUpForm } from './SignUpForm';

interface RegisterProps {
  openModal: boolean;
  onOpenModal?: (open: boolean) => void;
}
const Register: FC<RegisterProps> = ({ onOpenModal, openModal }) => {
  return (
    <ModalTransparent
      open={openModal}
      onOpenChange={onOpenModal}
      className="sm:max-w-[720px] min-h-[30rem]"
      title={<DialogTitle className="text-white  text-[2.5rem] text-center mt-4">Welcome to eHarvestHub</DialogTitle>}
      description={
        <DialogDescription className="text-white text-xl text-center">
          <div className="flex flex-col">
            <span>Connecting Growers + Retailers + Carriers</span>
            <span>Register</span>
          </div>
        </DialogDescription>
      }
    >
      <SignUpForm />
      {/* <DialogFooter>  
      </DialogFooter> */}
    </ModalTransparent>
  );
};

export default Register;
