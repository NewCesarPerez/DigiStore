
const cartModelSchema={
    timestamp: { type: String, required: true, default: Date.now() },
    productos: { type: Array, required: true },
    userId:{ type: String, required: true },
  }

  export default cartModelSchema