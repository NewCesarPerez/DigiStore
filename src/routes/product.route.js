import { Router } from "express";
const router = Router();
import {
    getCargarProductosView,
    getProductsView,
  } from "../controllers/productController.js";
import isAdmin from "../middlewares/isAdmin.js";
router.get("/", getProductsView)
router.get("/gestionar",isAdmin,getCargarProductosView);
export default router;