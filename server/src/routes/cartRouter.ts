import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  getCart,
  updateCart,
} from "../controllers/controllers.js";

const router = Router();

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:itemId", updateCart);
router.delete("/items/:itemId", deleteFromCart);

export default router;
