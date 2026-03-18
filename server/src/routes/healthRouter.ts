import { Router } from "express";
import { checkAuth, checkHealth } from "../controllers/controllers.js";

export const router = Router();

router.get("/health", checkHealth);
router.get("/me", checkAuth);

export default router;
