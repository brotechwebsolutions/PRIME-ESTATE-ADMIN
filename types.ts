
export enum FlatStatus {
  AVAILABLE = 'Available',
  SOLD = 'Sold'
}

export interface Flat {
  _id: string;
  flatNo: string;
  type: string;
  price: number;
  imageUrl: string;
  status: FlatStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFlatDTO {
  flatNo: string;
  type: string;
  price: number;
  imageUrl: string;
  status: FlatStatus;
}
