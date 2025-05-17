// services/product.service.ts
import { Product } from "../interface/product.interface";
import { db } from "../db/index";
import { productsTable } from "../db/products.schema";
import { eq } from "drizzle-orm";

const products: Product[] = [];

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await db.select().from(productsTable);
  return products;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const result = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  return result[0] || null;
};

export const createProduct = async (productData: Product): Promise<Product> => {
  const newProduct = {
    ...productData,
    uuid: crypto.randomUUID(),
  };

  const result = await db.insert(productsTable).values(newProduct).returning();
  return result[0] || null;
};
