let orderNumber=0
export default class OrderDto{

    constructor(cart, user){
        orderNumber=orderNumber+1
        this.order={
            productos:cart.productos,
            numDeOrden:orderNumber,
            emailDeUsuario:user.email
        }
        
    }
    
    getOrder(){
        return this.order
    }
}