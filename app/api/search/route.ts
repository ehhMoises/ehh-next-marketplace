import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export const getPageCookies = (cookieInput: string | undefined) => cookie.parse(cookieInput ?? '');
export async function POST(req: Request) {
  const accessTokenRecord = cookie.parse(req.headers.get('cookie') ?? '');
  console.log('accessToken', accessTokenRecord['access-token']);
  const body = await req.json();
  console.log(body);

  return NextResponse.json({
    data: 'Message Success!',
  });
}
