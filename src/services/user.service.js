//import userModel from "../daos/usuario/user.Dao.js";
//import { UserDao } from "../daos/index.js"
import DaoFactory from "../daos/factory/dao.factory.js";


class UserServices{
  constructor(userDao){
    this.dao=userDao
  }
  async getUser(infoToFilter){
    const data = await this.dao.findUser(infoToFilter);
       return data;
  }
  async getUserById(id, param2){
    const data = await this.dao.findUserById(id,param2);
       return data;
  }

  async createUser(newUser){
    const data=this.dao.create(newUser)
    return data
  }
  // async getUser(infoToFilter){
  //   const data = await this.dao.findOne(infoToFilter);
  //      return data;
  // }
  // async createUser(newUser){
  //   const data=this.dao.create(newUser)
  //   return data
  // }
}

//export default new UserServices(UserDao)
export default new  UserServices(DaoFactory.getUserDao())

