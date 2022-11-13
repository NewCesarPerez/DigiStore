
export default class ProductDtoForCart{

    constructor(product, qty){
        this.product={
            id:product.id,
            nombre:product.nombre,
            codigo:product.codigo,
            precio:product.precio,
            qty:qty
        }
        
    }
    
    getProduct(){
        return this.product
    }
}