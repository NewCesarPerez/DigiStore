const productModelSchema={
    timestamp: { type: String, required: true, default:Date.now() },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },
    stock: { type: Number, required: true },
  }
  export default productModelSchema