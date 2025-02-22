import cartServices from "../services/carrito.service.js";
import config from "../config/config.js";
import { createTransport } from "nodemailer";
import { loggerConsola, loggerErrorFile } from "../loggerConfig.js";

import userServices from "../services/user.service.js";
import orderServices from "../services/order.service.js";
//NODEMAILER
const trasporter = createTransport({
  host: "smtp.ethereal.email",
  port: process.env.ETHEREAL_PORT_HEROKU||config.ethereal.PORT,
  auth: {
    user: process.env.ETHEREAL_EMAIL_HEROKU|| config.ethereal.EMAIL,
    pass: process.env.ETHEREAL_PASSWORD_HEROKU|| config.ethereal.PASSWORD,
  },
});

//RUTAS - Carrito
export const postCarrito = async (req, res) => {
  try {
    const cart = req.body;

    const cartId = await cartServices.createCart(cart);

    loggerConsola.error(info);

    res.status(201).json(cartId);
  } catch (error) {
    loggerErrorFile.error(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getCarrito = async (req, res) => {
  try {
    const idToCompare = req.params.id_cart;
    const carritoToRender = await cartServices.getCartByCartId(idToCompare);
    if (!carritoToRender)
      res.status(500).json({ error: "Carrito no encontrado" });
    else {
      res.json(carritoToRender);
    }
  } catch (error) {
    loggerErrorFile.error(error);
    
    res.status(500).json({ message: "Hubo un error :" + error });
  }
};
export const getCarritoByUserId = async (req, res) => {
  try {
    const idToCompare = req.params.id;

    const carritoToRender = await cartServices.getCartbyUserId(idToCompare);
    if (!carritoToRender)
      res.status(500).json({ error: "Carrito no encontrado" });
    else {
      res.json(carritoToRender.productos);
    }
  } catch (error) {
    loggerErrorFile.error(error);
    res.status(500).json({ message: "Hubo un error :" + error });
  }
};

export const postProductInCartById = async (req, res) => {
  const idProductToCompare = req.params.id_prod;

  const productQty = req.query.qty;

  const authUsername = req.user.username;

  const userFromDb = await userServices.getUser({ username: authUsername });

  const cartIdToCompare = userFromDb._id;

  if (idProductToCompare && cartIdToCompare) {
    const newCart = await cartServices.addProductToCart(
      cartIdToCompare,
      idProductToCompare,
      productQty
    );

    if (!newCart)
      return res
        .status(400)
        .json({ message: "No se a agregado el producto al carrito" });

    return res.status(201).json({ cart: newCart });
  } else {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error en postproductbyid" });
  }
};
export const postCartIntoOrder = async (req, res) => {
  const authUsername = req.user.username;

  const userFromDb = await userServices.getUser({ username: authUsername });

  const cartIdToCompare = userFromDb._id;

  if (cartIdToCompare) {
    const cart = await cartServices.getCartbyUserId(cartIdToCompare);
    const user = req.user;

    if (!cart.productos.length) {
      res
        .status(500)
        .json({ Message: "No se puede crear una orden con un carrito vacío" });
    } else {
      const order = await orderServices.createOrder(cart, user);

      return res.status(201).json({ order: order });
    }
  } else {
    res.status(500).json({ message: "Error al cargar la orden." });
  }
};
export const deleteProductFromCartById = async (req, res) => {
  const idProductToCompare = req.params.id_prod;

  const authUsername = req.user.username;

  const userFromDb = await userServices.getUser({ username: authUsername });

  const cartIdToCompare = userFromDb._id;

  if (idProductToCompare && cartIdToCompare) {
    const newCart = await cartServices.deleteProductfromCart(
      cartIdToCompare,
      idProductToCompare
    );
    if (!newCart)
      return res
        .status(400)
        .json({ message: "No se ha agregado el producto al carrito" });

    return res.status(201).json({ cart: newCart });
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
