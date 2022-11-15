const messageModelSchema = {
    email: { type: String, require: true, },
    date:{ type: String, required: true },
    message:{ type: String, require: true},
    type: { type: String, require: true,  },
    };
    
    export default messageModelSchema;