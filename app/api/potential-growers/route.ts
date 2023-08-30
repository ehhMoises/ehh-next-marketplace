import PotentialGrowersSchema from '@/app/(Search)/lib/potentialGrowersSchema';
import { getPossibleGrowers } from '@/lib/api/product';
import { TokenTypes } from '@/lib/constant/cookies';
import {} from '@/models/http';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;
  const body = await req.json();

  const payload = await PotentialGrowersSchema.validate(body, {
    abortEarly: false,
  });
  const growers = await getPossibleGrowers({
    ...payload,
    accessToken,
  });
  return NextResponse.json({
    data: growers ?? [],
  });
}
