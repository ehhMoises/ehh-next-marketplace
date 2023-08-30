'use client';

import { FC, useState } from 'react';
import ModalTransparent from '../ModalTransparent';
import { DialogDescription, DialogTitle } from '../ui/dialog';
import { SignUpForm } from './SignUpForm';
import { ConfirmationCodeForm } from './ConfirmationCodeForm';
import { cn } from '@/lib/utils';

enum RegisterType {
  SIGN_UP = 'SIGN_UP',
  CONFIRMATION = 'CONFIRMATION',
}

interface RegisterProps {
  openModal: boolean;
  onOpenModal?: (open: boolean) => void;
  onSuccessConfirmation: () => void;
}
const Register: FC<RegisterProps> = ({ onOpenModal, openModal, onSuccessConfirmation }) => {
  const [emailFromSignUp, setEmailFromSignUp] = useState<string>();
  const [mode, setMode] = useState<RegisterType>(RegisterType.SIGN_UP);

  const onSuccessConfirmationHandler = () => {
    onSuccessConfirmation();
    setMode(RegisterType.SIGN_UP);
  };

  return (
    <ModalTransparent
      open={openModal}
      onOpenChange={(isOpen) => {
        setMode(RegisterType.SIGN_UP);
        if (onOpenModal) {
          onOpenModal(isOpen);
        }
      }}
      className={cn('sm:max-w-[720px]', mode === RegisterType.SIGN_UP ? 'overflow-y-auto' : '')}
      style={{
        height: mode === RegisterType.SIGN_UP ? 'calc(100vh - 100px)' : '',
      }}
      title={<DialogTitle className="text-white  text-[2.5rem] text-center mt-4">Welcome to eHarvestHub</DialogTitle>}
      description={
        <section className="flex flex-col">
          <DialogDescription className="text-white text-xl text-center">
            Connecting Growers + Retailers + Carriers
          </DialogDescription>
          <DialogDescription className="text-white text-xl text-center">
            {mode === RegisterType.CONFIRMATION && 'Confirmation Code'}
            {mode === RegisterType.SIGN_UP && 'Register'}
          </DialogDescription>
        </section>
      }
    >
      {mode === RegisterType.SIGN_UP && (
        <SignUpForm
          onNewUserCreated={(email) => {
            setEmailFromSignUp(email);
            setMode(RegisterType.CONFIRMATION);
          }}
          onSelectConfirmationCode={() => {
            setMode(RegisterType.CONFIRMATION);
          }}
        />
      )}
      {mode === RegisterType.CONFIRMATION && (
        <ConfirmationCodeForm onSuccessConfirmation={onSuccessConfirmationHandler} emailFromSignUp={emailFromSignUp} />
      )}
    </ModalTransparent>
  );
};

export default Register;
