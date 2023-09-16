import { redirect } from 'next/navigation';
import { FC } from 'react';

const GrowerScreen: FC = () => {
  redirect('/grower/home');
};

export default GrowerScreen;
