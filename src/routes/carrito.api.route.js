import { Router } from "express";
import {
    postProductInCartById,
    deleteProductFromCartById,
    getCarrito,
    getCarritoByUserId,
  } from "../controllers/carritoController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = Router();

router.get("/:id_cart", getCarrito);
router.get("/user/:id", getCarritoByUserId)
//router.post("/", postCarrito);
router.post("/:id_prod/producto/", postProductInCartById);
router.delete("/:id_prod/producto/", deleteProductFromCartById);

export default router;