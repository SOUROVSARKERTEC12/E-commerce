// services/product.service.ts
import { Product } from "../interface/product.interface";
import { db } from "../db/index";
import { productsTable } from "../db/products.schema";
import { eq } from "drizzle-orm";
import omitImmutableFields from "../utils/immutable";

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await db.select().from(productsTable);
      return products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const result = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, id));
      return result[0] || [];
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw new Error("Failed to fetch product");
    }
  }

  async createProduct(productData: Product): Promise<Product> {
    try {
      const newProduct = {
        ...productData,
        uuid: crypto.randomUUID(),
      };

      const result = await db
        .insert(productsTable)
        .values(newProduct)
        .returning();
      return result[0] || null;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  }
  async updateProduct(
    id: number,
    productData: Partial<Product>
  ): Promise<Product | null> {
    try {
      const existingProduct = await this.getProductById(id);
      if (!existingProduct) {
        return null;
      }
      const safeUpdateData = omitImmutableFields(productData, ["id", "uuid"]);
      
  
      const result = await db
        .update(productsTable)
        .set(safeUpdateData)
        .where(eq(productsTable.id, id))
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw new Error("Failed to update product");
    }
  }
  async deleteProduct(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(productsTable)
        .where(eq(productsTable.id, id))
        .returning();

      return result.length > 0;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw new Error("Failed to delete product");
    }
  }
}
