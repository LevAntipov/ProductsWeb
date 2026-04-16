import { Router } from "express";
import { getProduct, getProducts } from "../controllers/controllers.js";

export const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
