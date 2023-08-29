'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import SignIn from '../SignIn';
import Register from '../Register';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

const MainNavigationHeader: FC = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpInModalOpen, setIsSignUpInModalOpen] = useState(false);

  return (
    <section className="w-full bg-white">
      <SignIn
        openModal={isSignInModalOpen}
        onOpenModal={(isOpen) => {
          setIsSignInModalOpen(isOpen);
        }}
      />
      <Register
        openModal={isSignUpInModalOpen}
        onOpenModal={(isOpen) => {
          setIsSignUpInModalOpen(isOpen);
        }}
      />

      <nav className="h-20 flex flex-row justify-between mt-3 px-4">
        <div>
          <a
            className="text-stone-500 hover:text-stone-600 transition-colors"
            href="https://eharvesthub.com"
            target="_blank"
          >
            <div className="flex flex-row">
              <p>About eHarvestHub</p>
              <ChevronDown width={16} />
            </div>
          </a>
        </div>
        <div className="h-20 w-80">
          <Image src="/logo.png" alt="eHarvestHub Logo" width="300" height="200" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row  cursor-pointer h-min">
              <p className="text-stone-500 hover:text-stone-600 transition-colors inline-block ">Sign in or register</p>
              <ChevronDown width={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuCheckboxItem
              onClick={() => {
                setIsSignInModalOpen(true);
              }}
            >
              Sign In
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onClick={() => {
                setIsSignUpInModalOpen(true);
              }}
            >
              Register
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </section>
  );
};

export default MainNavigationHeader;
