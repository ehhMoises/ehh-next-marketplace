import { getVarietiesProduct } from '@/lib/api/product';
import { ProductCardMode } from '@/lib/constant/ui';
import { PRODUCT_CARD_MODE_KEY, TokenTypes } from '@/lib/constant/cookies';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = cookies();
  // console.log(cookieStore.get(PRODUCT_CARD_MODE_KEY));

  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;
  const body = await req.json();

  if (body.commodity) {
    const filteredProducts = await getVarietiesProduct({
      commodity: body.commodity,
      accessToken,
    });

    cookieStore.set(PRODUCT_CARD_MODE_KEY, ProductCardMode.FILTERED);

    return NextResponse.json(filteredProducts, {
      status: (filteredProducts ?? []).length === 0 ? 400 : 200,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  cookieStore.set(PRODUCT_CARD_MODE_KEY, ProductCardMode.FILTERED);
  return NextResponse.json({
    data: 'Message Success!',
  });
}
