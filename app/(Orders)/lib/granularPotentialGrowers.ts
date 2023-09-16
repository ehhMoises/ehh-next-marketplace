import { getCartsByUser } from '@/lib/api/shopping-cart';
import { PotentialGrowers } from '@/models/targetSellers';

export const getPotentialGrowersByskippingHoldingCartItems = async ({
  accessToken,
  potentialGrowers,
}: {
  accessToken: string | undefined;
  potentialGrowers: PotentialGrowers[];
}): Promise<PotentialGrowers[]> => {
  const cartItems = await getCartsByUser({
    accessToken,
  });

  return potentialGrowers.map((potentialGrower) => {
    const cartItem = cartItems.data.find((cartItem) => potentialGrower.id === cartItem.stock.id);
    if (cartItem) {
      return {
        ...potentialGrower,
        isUnderCart: true,
        cartItemId: cartItem.id,
      };
    }

    return {
      ...potentialGrower,
      isUnderCart: false,
    };
  });
};
