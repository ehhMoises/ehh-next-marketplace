export interface IGrade {
  name: string;
  description: string;
}
export interface Grade extends IGrade {
  id: string;
  isActive: boolean;
}
