import DaoFactory from "../daos/factory/dao.factory.js";
import OrderDtoClass from "../dto/order.dto.js" 
class OrderServices{
    constructor(orderDao, carritoDao){
        this.dao=orderDao
        this.carritoDao=carritoDao
    }

    async createOrder(cart, user) {
        console.log('user for order: '+user)
        const orderDto= new OrderDtoClass(cart, user)
        const order= orderDto.getOrder()
        const data = await this.dao.create(order);
        cart.productos=[]
        const emptyCart=await this.carritoDao.update(cart._id, cart)

        return data;
      }
}

export default new OrderServices(DaoFactory.getOrderDao(), DaoFactory.getCarritoDao());