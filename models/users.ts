import { IEnum } from "./enum";

export interface IUser {
  id: string;
  accountId: string;
  email: string;
  name: string;
  position: string | null;
  status: IEnum;
  type: IEnum;
}
