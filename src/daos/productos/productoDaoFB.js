import ContenedorFB from "../../contenedores/contenedorFB.js";
let instance=null
export class ProductoDaoFirebase extends ContenedorFB {
  constructor() {
    super("productos");
  }
  static getInstance(){
    if(!instance){
      instance= new ProductoDaoFirebase()
    }
    return instance
  }
}
export default ProductoDaoFirebase;