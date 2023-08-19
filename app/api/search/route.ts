import { NextResponse } from 'next/server';
import * as cookie from 'cookie';
import FilterBrandSchema, { KeysFilterBrand, SearchBrandValidationError } from '@/app/(Search)/lib/filterBrandSchema';
import { ValidationError } from 'yup';

export async function POST(req: Request) {
  try {
    const accessTokenRecord = cookie.parse(req.headers.get('cookie') ?? '');
    console.log('accessToken', accessTokenRecord['access-token']);
    const body = await req.json();
    const filterBrand = await FilterBrandSchema.validate(body, {
      abortEarly: false,
    });

    return NextResponse.json({
      data: 'Message Success!',
      filterBrand,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors: SearchBrandValidationError = {};
      for (const validationError of error.inner) {
        if (validationError.path) {
          const keys = validationError.path as KeysFilterBrand;
          validationErrors[keys] = validationError.errors;
        }
      }
      return NextResponse.json(validationErrors, {
        status: 400,
      });
    }
  }
}
