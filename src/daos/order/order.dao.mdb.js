import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import OrderModelSchema from "../../model/po.model.js"

let instance =null
class OrderDaoMongo extends ContenedorMongo{
    constructor() {
        super("order", OrderModelSchema);
      }

      static getInstance(){
        if (!instance){
          instance=new OrderDaoMongo()
          
        }

        return instance
      }
}

export default OrderDaoMongo