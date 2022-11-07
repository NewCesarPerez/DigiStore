import { ProductoDao } from "../daos/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { loggerConsola } from "../loggerConfig.js";
import productServices from "../services/product.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProducts = async (req, res) => {
  try {
    const productos = await productServices.getProducts();

    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getProductsView = async (req, res) => {
  try {
    const productos = await productServices.getProducts();
    res.render("productos.ejs", {
      username: req.user.firstName,
      productos: productos,
      hasAny: productos.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getCargarProductosView = async (req, res) => {
  try {
    const productos = await productServices.getProducts();
    res.render("uploadProduct.ejs", {
      productos: productos,
      hasAny: productos.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const idToCompare = req.params.id;
    const productToRender = await productServices.getProductsById(idToCompare);
    if (!productToRender) res.json({ error: "Producto no encontrado" });
    else res.json(productToRender);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const postProducts = async (req, res) => {
  try {
    const products = req.body;
    const newProduct = await productServices.postProducts(products);
    loggerConsola.info(newProduct);
    res.redirect("/productos/gestionar");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const updateProductsById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body;
    await productServices.updateProductsById(productId, product);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const idToCompare = req.params.id;
    const respuesta = await productServices.deleteProductById(idToCompare);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
