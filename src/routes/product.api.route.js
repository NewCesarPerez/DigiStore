import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router();
import {
    getProducts,
    postProducts,
    getProductsById,
    updateProductsById,
    deleteProductById,
  } from "../controllers/productController.js";

  router.get("/", getProducts);
  router.get("/:id", getProductsById);
  router.post("/", isAdmin, postProducts);
  router.put("/:id", isAdmin, updateProductsById);
  router.delete("/:id", isAdmin, deleteProductById);

  export default router;