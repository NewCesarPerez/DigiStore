import {ContenedorMongo} from "../../contenedores/contenedorMDB.js";
import userModelSchema from "../../model/user.model.js";
let instance =null
class UserDaoMongo extends ContenedorMongo{
    constructor() {
        super("user", userModelSchema);
      }

      static getInstance(){
        if (!instance){
          instance=new UserDaoMongo()
          
        }

        return instance
      }
}

export default UserDaoMongo