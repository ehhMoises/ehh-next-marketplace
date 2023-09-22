export interface IEnum {
  id: number;
  name: string;
}

export interface IEnumResponse {
  count: number;
  data: IEnum[];
}
