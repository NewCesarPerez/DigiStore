const orderModelSchema={
    timestamp: { type: String, required: true, default:Date.now() },
    productos: { type: Array, required: true },
    numDeOrden:{type: Number, required: false},
    estado: { type: String, required: true, default: 'Generada' },
    emailDeUsuario: { type: String, required: true },
  }
  export default orderModelSchema