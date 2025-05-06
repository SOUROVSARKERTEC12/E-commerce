import { Router } from "express";
import {
  createProductController,
  getProductController,
  getProductControllerById,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";

const router = Router();

router
  .route("/products")
  .get(getProductController)
  .post(createProductController)
  .put(updateProductController)
  .patch(updateProductController);

router
  .route("/products/:id")
  .get(getProductControllerById)
  .delete(deleteProductController);

export default router;
