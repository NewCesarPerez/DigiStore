import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import messageModelSchema from "../../model/user.model.js";
let instance =null
class MessageDaoMongo extends ContenedorMongo{
    constructor() {
        super("message", messageModelSchema);
      }

      static getInstance(){
        if (!instance){
          instance=new MessageDaoMongo()
          
        }

        return instance
      }
}

export default MessageDaoMongo