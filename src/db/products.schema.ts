import { pgTable, uuid, text, integer, varchar, doublePrecision } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().generatedAlwaysAsIdentity(),
  uuid: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image : varchar({ length: 255 }),
  price: doublePrecision().notNull(),
  quantity: integer().notNull(),
});
