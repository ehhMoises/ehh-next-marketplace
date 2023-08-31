

export interface IPackStyle {
  name: string;
  description: string;
}

export interface PackStyle extends IPackStyle {
  id: string;
  isActive: boolean;
}
