//import { CarritoDao } from "../daos/index.js";
import DaoFactory from "../daos/factory/dao.factory.js";
const productDao = DaoFactory.getProductDao();
class CartServices {
  constructor(carritoDao) {
    this.dao = carritoDao;
  }

  async createCart(cart) {
    const data = await CarritoDao.create(cart);
    return data;
  }

  async getAllCarts() {
    const data = await CarritoDao.readAll();
    return data;
  }
  async getCartsById(id) {
    const data = await CarritoDao.readById(id);
    return data;
  }
  async addProductToCart(cartId, idProduct) {
    const productById = await productDao.readById(idProduct);
    const cartById = await CarritoDao.readById(cartId);

    const cart = await CarritoDao.readAll();

    const index = cart.findIndex((element) => element.id === cartById.id);
    cartById.productos.push(productById);

    await carritoDao.update(cartById.id, cartById);

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
    const data = await CarritoDao.update(idToRetrieve, info);
    return data;
  }
  async deleteCartById(id) {
    const data = await CarritoDao.deleteById(id);
  }
}

//export default new CartServices(CarritoDao)
export default new CartServices(DaoFactory.getUserDao());
