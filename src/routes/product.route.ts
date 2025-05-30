import { Router } from "express";
import {
  createProductController,
  getProductController,
  getProductControllerById,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";
import { asyncValidate } from "../middleware/schema.validator";
import {
  InsertProductSchema,
  UpdateProductSchema,
} from "../schema/products.schema";

const router = Router();

router
  .route("/products")
  .get(getProductController)
  .post(
    asyncValidate({ schema: { body: InsertProductSchema } }),
    createProductController
  )
  .patch(
    asyncValidate({ schema: { body: UpdateProductSchema } }),
    updateProductController
  );

router
  .route("/products/:id")
  .get(getProductControllerById)
  .delete(deleteProductController);

export default router;
