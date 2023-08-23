'use client';

import { useQuery } from '@tanstack/react-query';

const getData = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  // The return value is not serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const useGetPikachu = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['GET_PIKACHU'],
    queryFn: () => getData(),
  });

  return { isLoading, error, data };
};

export { useGetPikachu };
