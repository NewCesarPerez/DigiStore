
import DaoFactory from "../daos/factory/dao.factory.js";
import productDtoClass from "../dto/product.cart.dto.js";
import productService from "./product.service.js";

class CartServices {
  constructor(carritoDao) {
    this.dao = carritoDao;
  }

  async createCart(userId) {
    const cart = {
      productos: [],
      userId: userId,
    };
    const data = await this.dao.create(cart);
    return data;
  }

  async getCartByCartId(id) {
    const data = await this.dao.readById(id);
    return data;
  }
  async getCartbyUserId(userId) {
    const data = await this.dao.readCartByUserId(userId);
    return data;
  }
  async addProductToCart(cartId, idProduct, productQty) {
    const productById = await productService.getProductsById(idProduct);

    const productDto = new productDtoClass(productById, productQty);

    const productDtoToCart = productDto.getProduct();

    const cartById = await this.dao.readCartByUserId(cartId); 

    cartById.productos.push(productDtoToCart);

    await this.dao.update(cartById.id, cartById);

    const cartByIdUpdated = await this.dao.readById(cartById.id);

    return cartByIdUpdated;
  }

  async deleteProductfromCart(cartId, idProduct) {
    const productById = await productService.getProductsById(idProduct);
    const cartById = await this.dao.readCartByUserId(cartId);
    let updatedCart;
    cartById.productos = cartById.productos.filter((prod) => {
      prod.id !== productById.id;
    });
    updatedCart=await this.dao.update(cartById.id, cartById)
    return updatedCart
  }

}

export default new CartServices(DaoFactory.getCarritoDao());

