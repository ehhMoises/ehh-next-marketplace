export enum StatusType {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Unconfirmed = 'Unconfirmed',
}

export enum StatusTypeId {
  Enabled = 100,
  Disabled = 200,
  Unconfirmed = 300,
}

export enum AccountTypeId {
  Grower = 100,
  Buyer = 200,
}

export enum AccountType {
  Grower = 'Grower',
  Buyer = 'Buyer',
}

export enum UserType {
  Basic = 'Basic',
  Admin = 'Admin',
}

export enum UserTypeId {
  Basic = 100,
  Admin = 200,
}

export interface IUserMe {
  id: string;
  email: string;
  name: string;
  status: {
    id: StatusTypeId;
    name: StatusType;
  };
  type: {
    id: UserTypeId;
    name: UserType;
  };
  account: {
    id: string;
    name: string;
    status: {
      id: StatusTypeId;
      name: StatusType;
    };
    type: {
      id: AccountTypeId;
      name: AccountType;
    };
  };
}

export interface IAccountMe {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  contactName: string;
  contactPhone: string;
  type: {
    id: AccountTypeId;
    name: AccountType;
  };
  status: {
    id: StatusTypeId;
    name: StatusType;
  };
}

export interface IAccountBody {
  name: string;
  description: string;
  logoUrl: string;
  contactName: string;
  contactPhone: string;
}

export interface IAddressAccountBody {
  id: string | null;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export interface IAddressAccount {
  id: string;
  accountId: string;
  fullAddress: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}
