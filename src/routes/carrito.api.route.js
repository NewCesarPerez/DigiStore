import { Router } from "express";
import {
    postCarrito,
    postProductInCartById,
    deleteCarritoById,
    getCarrito,
    deleteProductFromCartById,
    getCarritoByUserId,
  } from "../controllers/carritoController.js";
const router = Router();

router.get("/:id", getCarrito);
router.get("/user/:id", getCarritoByUserId)
router.post("/", postCarrito);
router.post("/:id/productos/:id_prod", postProductInCartById);
router.delete("/:id", deleteCarritoById);
router.delete("/:id/productos/:id_prod", deleteProductFromCartById);

export default router;