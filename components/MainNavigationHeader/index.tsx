'use client';

import { FC, Fragment, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, LogOut } from 'lucide-react';
import SignIn from '../SignIn';
import Register from '../Register';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import useCookie from '@/lib/hooks/useCookie';
import { TokenTypes } from '@/lib/constant/cookies';
import { AccountType, IUserMe } from '@/models/account-user';
import { useRouter } from 'next/navigation';
import { removeAllCookies } from '@/lib/cookie';
import { useShoppingCartItemsQuery } from '@/app/(Orders)/lib/hooks/queries/useShoppingCartItemsQuery';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MainNavigationHeaderProps {
  me?: IUserMe;
}

const MainNavigationHeader: FC<MainNavigationHeaderProps> = ({ me }) => {
  const { data: shoppingCartItems } = useShoppingCartItemsQuery(me);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpInModalOpen, setIsSignUpInModalOpen] = useState(false);
  const accessToken = useCookie(TokenTypes.ACCESS_TOKEN);
  const router = useRouter();
  const canPurchaseOnShoppingCart =
    shoppingCartItems && shoppingCartItems.count > 0 && me?.account.type.name === AccountType.Buyer;

  const growerRoutesHandler = (key: string) => {
    router.push(`/grower/${key}`);
  };

  const buyerRoutesHandler = (key: string) => {
    router.push(`/retailer/${key}`);
  };

  const signOutHandler = () => {
    removeAllCookies();
    router.push('/sign-out');
  };

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
        onSuccessConfirmation={() => {
          setIsSignUpInModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />

      <nav className={cn('flex flex-row justify-between mt-3 px-4', canPurchaseOnShoppingCart ? 'h-28' : 'h-20')}>
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

        <div className="flex flex-col items-center gap-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row cursor-pointer h-min">
                <p className="text-stone-500 hover:text-stone-600 transition-colors inline-block ">
                  {me && accessToken ? `Hello ${me.name}` : 'Sign in or register'}
                </p>
                <ChevronDown width={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {accessToken &&
                (me?.account.type.name === AccountType.Grower ? (
                  <Fragment key="GrowerStage">
                    <DropdownMenuLabel>{me?.account.type.name} Marketplace</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem onClick={() => growerRoutesHandler('home')}>
                      Dashboard
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => growerRoutesHandler('catalog')}>
                      Catalog
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => growerRoutesHandler('profile')}>
                      Profile
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                  </Fragment>
                ) : (
                  <Fragment key="BuyerStage">
                    <DropdownMenuLabel>{me?.account.type.name} Marketplace</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem onClick={() => buyerRoutesHandler('home')}>
                      Dashboard
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => buyerRoutesHandler('orders')}>
                      Orders
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => buyerRoutesHandler('profile')}>
                      Profile
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                  </Fragment>
                ))}
              {!accessToken && (
                <Fragment key="noLoginStage">
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
                </Fragment>
              )}
              {me && (
                <DropdownMenuCheckboxItem onClick={signOutHandler} className="gap-x-2">
                  Sign Out
                  <LogOut size={16} className="text-stone-400" />
                </DropdownMenuCheckboxItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {canPurchaseOnShoppingCart && (
            <Link href={'/checkout'} className="flex flex-col items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faCartShopping}
                size={'2x'}
                className="text-marketplace hover:text-stone-400 transition-colors"
              />
              <p className="text-marketplace font-bold">Cart {shoppingCartItems.count}</p>
            </Link>
          )}
        </div>
      </nav>
    </section>
  );
};

export default MainNavigationHeader;
