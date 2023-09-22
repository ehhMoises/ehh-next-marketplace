import { IEnum } from "./enum";

export interface IUser {
  id: string;
  accountId: string;
  email: string;
  password: string;
  name: string;
  position: string | null;
  type: IEnum | number;
  status: IEnum | number;
}
