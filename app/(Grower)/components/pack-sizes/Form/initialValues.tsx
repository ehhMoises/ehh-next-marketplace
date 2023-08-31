import { IPackSize } from '@/models/packSize';
import { IPackStyle } from '@/models/packStyle';

export const initialValues: IPackSize = {
  name: '',
  description: '',
  unitOfMeasure: '',
  abbreviation: '',
  min: 0,
  max: 0,
  packStyleId: '',
};
