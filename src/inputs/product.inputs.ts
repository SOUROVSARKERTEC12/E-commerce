import z from "zod";
import { InsertProductSchema, UpdateProductSchema } from "../schema/products.schema";

export type InsertProductInput = z.infer<typeof InsertProductSchema>["body"];
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>["body"];