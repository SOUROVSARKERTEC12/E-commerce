// services/product.service.ts
import { Product } from "../interface/product.interface";

const products: Product[] = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return products.find((p) => p.id === id) || null;
};
