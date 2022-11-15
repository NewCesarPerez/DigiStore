import ProductoDaoMongo from "../productos/productoDaoMDB.js";
import ProductoDaoFirebase from "../productos/productoDaoFB.js";
import CarritoDaoMongo from "../carritos/carritoDaoMDB.js"
import CarritoDaoFirebase from "../carritos/carritoDaoFB.js";
import UserDaoMongo from "../usuario/user.dao.MDB.js"
import OrderDaoMongo from "../order/order.dao.mdb.js";
import MessageDaoMongo from "../mensaje/msg.dao.mdb.js";
import config from "../../config/config.js";

export default class DaoFactory{

        static getProductDao(){

            return config.database==="mongo"? ProductoDaoMongo.getInstance():ProductoDaoFirebase.getInstance();
        }
        static getCarritoDao(){
            return config.database==="mongo"? CarritoDaoMongo.getInstance():CarritoDaoFirebase.getInstance();
        }
        static getUserDao(){
            
            return  UserDaoMongo.getInstance()
        }
        static getOrderDao(){
            return  OrderDaoMongo.getInstance()
        }
        static getMsgDao(){
            return  MessageDaoMongo.getInstance()
        }
}

