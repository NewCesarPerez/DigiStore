//import { ProductoDao } from "../daos/index.js";
import DaoFactory from "../daos/factory/dao.factory.js";

class ProductServices {
  constructor(productDao) {
    this.dao = productDao;
  }
  async getProducts() {
    const data = this.dao.readAll();
    return data;
  }

  async getProductsById(idToCompare) {
    const data = await this.dao.readById(idToCompare);
    return data;
  }
  async getProductsByCategory(category){
   
    const data =await this.dao.findProductsByCat(category)
    return data
  }
  async postProducts(products) {
    const data = await this.dao.create(products);
    return data;
  }

  async updateProductsById(productId, product) {
    await this.dao.update(productId, product);
  }

  async deleteProductById(idToCompare) {
    const data = await this.dao.deleteById(idToCompare);
    return data;
  }
}

//export default new ProductServices(ProductoDao);
export default new ProductServices(DaoFactory.getProductDao());
