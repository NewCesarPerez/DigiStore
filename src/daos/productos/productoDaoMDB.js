import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import productModelSchema from "../../model/product.model.js";

let instance=null
class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", productModelSchema);
  }
  static getInstance(){
    if(!instance){
      instance= new ProductoDaoMongo()
    }
    return instance
  }
}
export default ProductoDaoMongo;
