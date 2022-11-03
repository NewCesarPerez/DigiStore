import ContenedorFB from "../../contenedores/contenedorFB.js";

let instance =null
class CarritoDaoFirebase extends ContenedorFB {
  constructor() {
    super("carritos");
  }

  create(){
    return this.create({productos:[], timeStamp:Date.now()})
  }
  static getInstance(){
    if(!instance){
      instance=new CarritoDaoFirebase()
    }
    return instance
  }
}
export default CarritoDaoFirebase;