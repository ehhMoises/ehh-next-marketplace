'use client';

import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import style from './Register.module.css';
import { cn } from '@/lib/utils';

const SignUpForm: FC = () => {
  return (
    <form>
      <div className="grid gap-4 py-4 px-2 md:px-10">
        <div className="grid grid-cols-1">
          <Input
            id="username"
            name="username"
            className={cn(
              style.signUp,
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
              style.signUp,
              'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Password"
          />
        </div>
      </div>

      <div className="px-0 sm:px-10 w-full">
        <Button type="submit" className="w-full h-20">
          <span className="text-xl">Sign Up</span>
        </Button>
      </div>
    </form>
  );
};

export { SignUpForm };
