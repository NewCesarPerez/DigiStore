
const cartModelSchema={
    timestamp: { type: String, required: true, default: Date.now() },
    productos: { type: Array, required: true },
  }

  export default cartModelSchema