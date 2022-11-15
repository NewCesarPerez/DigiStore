import DaoFactory from "../daos/factory/dao.factory.js";

class MessageServices{
    constructor(msgDao){
      this.dao=msgDao
    }
    async getChats(){
      const data = await this.dao.readAll();
         return data;
    }
    async getChatsByEmail(email){
      const data = await this.dao.readByEmail(email);
         return data;
    }
  
    async insertMsg(msg){
      const data=this.dao.create(msg)
      return data
    }
    
  }
  
  
  export default new  MessageServices(DaoFactory.getMsgDao())