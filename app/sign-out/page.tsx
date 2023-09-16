import { redirect } from 'next/navigation';

export default async function SignOut() {
  redirect('/');
}
