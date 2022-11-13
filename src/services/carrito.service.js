//import { CarritoDao } from "../daos/index.js";
import DaoFactory from "../daos/factory/dao.factory.js";
const productDao = DaoFactory.getProductDao();
const carritoDao = DaoFactory.getCarritoDao()
class CartServices {
  constructor(carritoDao) {
    this.dao = carritoDao;
  }

  async createCart(userId) {
    const cart={
      productos:[],
      userId:userId
    }
    const data = await this.dao.create(cart);
    return data;
  }

  async getAllCarts() {
    const data = await this.dao.readAll();
    return data;
  }
  async getCartsById(id) {
    const data = await this.dao.readById(id);
    return data;
  }
  async addProductToCart(cartId, idProduct) {
    const productById = await productDao.readById(idProduct);
    const cartById = await this.dao.readById(cartId);

    const cart = await this.dao.readAll();

    const index = cart.findIndex((element) => element.id === cartById.id);
    cartById.productos.push(productById);

    await this.dao.update(cartById.id, cartById);

    const cartByIdUpdated = await cartServices.getCartsById(cartIdToUse);

    return cartByIdUpdated;
  }

  async deleteProductfromCart(cartId, idProduct){
    const productById = await productDao.readById(idProduct);
    const cartById = await cartServices.getCartsById(cartIdToUse);
    let updatedCart;
    cartById.productos = cartById.productos.filter((prod) => {
      prod.id !== productById.id;
    });
    return updatedCart=await cartServices.updateCartById(cartById.id, cartById);
  }


  async updateCartById(idToRetrieve, info) {
    const data = await this.dao.update(idToRetrieve, info);
    return data;
  }
  async deleteCartById(id) {
    const data = await this.dao.deleteById(id);
  }
}

export default new CartServices(carritoDao)
//export default new CartServices(DaoFactory.getUserDao());
