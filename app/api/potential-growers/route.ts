import PotentialGrowersSchema from '@/app/(Search)/lib/potentialGrowersSchema';
import { getPossibleGrowers } from '@/lib/api/product';
import { TokenTypes } from '@/lib/cookies';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;
  const body = await req.json();

  const potentialGrowersPayload = await PotentialGrowersSchema.validate(body, {
    abortEarly: false,
  });

  const data = await getPossibleGrowers({
    ...potentialGrowersPayload,
    accessToken,
  });

  return NextResponse.json({
    data: data ?? [],
  });
}
