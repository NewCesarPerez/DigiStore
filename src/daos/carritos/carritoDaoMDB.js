import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import cartModelSchema from "../../model/cart.model.js";

let instance=null
class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", cartModelSchema);
  }
  static getInstance(){
    if (!instance){
      instance= new CarritoDaoMongo()
    }
    return instance
  }
}
export default CarritoDaoMongo
