export interface GrowingMethod {
  id: number;
  name: string;
}

export interface GrowingMethodsResponse {
  count: number;
  data: GrowingMethod[];
}