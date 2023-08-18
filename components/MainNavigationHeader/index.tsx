'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import SignIn from '../SignIn';

const MainNavigationHeader: FC = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  return (
    <section className="w-full">
      <SignIn
        openModal={isSignInModalOpen}
        onOpenModal={(isOpen) => {
          setIsSignInModalOpen(isOpen);
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

        <div
          className="flex flex-row  cursor-pointer h-min"
          onClick={() => {
            setIsSignInModalOpen(true);
          }}
        >
          <p className="text-stone-500 hover:text-stone-600 transition-colors inline-block ">Sign in or register</p>
          <ChevronDown width={16} />
        </div>
      </nav>

      <div className="flex flex-col justify-center w-full">
        <div className="w-full">
          <Image className="w-full" src="/fruits/cherry.jpg" alt="eHarvestHub Logo" width="800" height="400" />
        </div>
      </div>
    </section>
  );
};

export default MainNavigationHeader;
