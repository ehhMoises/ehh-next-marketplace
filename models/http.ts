import { AxiosHeaders, Method } from 'axios';

export interface FilterHTTPBase {
  isActive: boolean;
  search: string;
}

export interface ResponseHttpBase<Data> {
  data: Data;
  filter?: FilterHTTPBase;
  count: number;
}

export type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;
