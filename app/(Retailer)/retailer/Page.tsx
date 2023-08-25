import { FC } from 'react';
import { redirect } from 'next/navigation';

const RetailerScreen: FC = () => {
  redirect('/retailer/home');
};

export default RetailerScreen;
