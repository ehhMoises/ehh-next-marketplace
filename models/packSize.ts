export interface IPackSize {
  name: string;
  description: string;
  unitOfMeasure: string;
  abbreviation: string;
  min: number;
  max: number;
  packStyleId: string;
}

export interface PackSize extends IPackSize {
  id: string;
  isActive: boolean;
}
