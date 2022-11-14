import cartServices from "../services/carrito.service.js";
import config from "../config/config.js";
import { createTransport } from "nodemailer";
import { loggerConsola, loggerErrorFile } from "../loggerConfig.js";
import NodeMailerClass from "../services/nodeMailer.class.js";
import userServices from "../services/user.service.js";
import orderServices from "../services/order.service.js"
//NODEMAILER
const trasporter = createTransport({
  host: "smtp.ethereal.email",
  port: config.ethereal.PORT,
  auth: {
    user: config.ethereal.EMAIL,
    pass: config.ethereal.PASSWORD,
  },
});

//RUTAS - Carrito
export const postCarrito = async (req, res) => {
  try {
    const cart = req.body;

    let emailBody;
    cart.productos.map((product) => {
      return (emailBody += `
      <p class= "text-primary" >Nombre: ${product.nombre}  </p>    
      <p class= "text-primary">Codigo: ${product.codigo} </p> 
      <p class= "text-primary">Precio: ${product.precio}</p>`);
    });
    const nodeMailer = new NodeMailerClass(
      "Servidor node.js",
      config.ethereal.EMAIL,
      `Nuevo Pedido - Cliente: ${req.user.firstName} ${req.user.lastName}, Email: ${req.user.email} `,
      emailBody
    );
    const info = nodeMailer.sendEmail();

    const cartId = await cartServices.createCart(cart);

    loggerConsola(info);

    res.status(201).json(cartId);
  } catch (error) {
    console.log(error);
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
    loggerErrorFile(error);
    res.status(500).json({ message: "Hubo un error :" + error });
  }
};
export const getCarritoByUserId = async (req, res) => {
  try {
    const idToCompare = req.params.id;
    console.log(typeof idToCompare);
    const carritoToRender = await cartServices.getCartbyUserId(idToCompare);
    if (!carritoToRender)
      res.status(500).json({ error: "Carrito no encontrado" });
    else {
      res.json(carritoToRender.productos);
    }
  } catch (error) {
    loggerErrorFile(error);
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
    console.log("entrando al primer if");
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
    console.log("entrando al else");
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
    console.log("entrando al primer if");

    const cart = await cartServices.getCartbyUserId(cartIdToCompare);
    const user = req.user;

    if (!cart.productos.length) {
      res
        .status(500)
        .json({ Message: "No se puede crear una orden con un carrito vacío" });
    }else{
      
      const order = await orderServices.createOrder(cart, user);
      
      return res.status(201).json({ order: order });
    }

    
  } else {
    console.log("entrando al else");
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
