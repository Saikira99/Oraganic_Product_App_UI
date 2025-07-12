export interface Product {
  _id: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  certification: string;
  category: string;
}

export interface Feedback {
  _id?: string;
  productId: string;
  name: string;
  message: string;
  createdAt?: string;
}
