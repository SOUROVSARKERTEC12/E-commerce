import { Router } from "express";
import { createProductController, getProductController } from "../controllers/product.controller";

const router = Router();

router.route('/products').get(getProductController);
router.route('/products').post(createProductController);

export default router;