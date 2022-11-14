import DaoFactory from "../daos/factory/dao.factory.js";
import OrderDtoClass from "../dto/order.dto.js";
import NodeMailerClass from "../services/nodeMailer.class.js";
import config from "../config/config.js";
import { loggerConsola } from "../loggerConfig.js";
class OrderServices {
  constructor(orderDao, carritoDao) {
    this.dao = orderDao;
    this.carritoDao = carritoDao;
  }

  async createOrder(cart, user) {
    
    const orderDto = new OrderDtoClass(cart, user);
    const order = orderDto.getOrder();
    const data = await this.dao.create(order);
    if (data) {
      let emailBody;
      cart.productos.map((product) => {
        return (emailBody += `
        <p class= "text-primary" >Nombre: ${product.nombre}  </p>    
        <p class= "text-primary">Codigo: ${product.codigo} </p> 
        <p class= "text-primary">Precio: ${product.precio}</p>`);
      });

      const totalOrden = cart.productos.reduce((sum, item) => {
        return sum + item.precio * item.qty;
      }, 0);
      
      const nodeMailer = new NodeMailerClass(
        "Servidor node.js",
        config.ethereal.EMAIL,
        `Nuevo Pedido - Cliente: ${user.firstName} ${user.lastName}, Email: ${user.email}, Monto total: ${totalOrden} `,
        emailBody
      );
      const info = await nodeMailer.sendEmail();
      loggerConsola.info(info);
    }
    cart.productos = [];
    const emptyCart = await this.carritoDao.update(cart._id, cart);

    return data;
  }
}

export default new OrderServices(
  DaoFactory.getOrderDao(),
  DaoFactory.getCarritoDao()
);
