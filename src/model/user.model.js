const userModelSchema = {
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  address: { type: String, required: true, max: 150 },
  admin: { type: Boolean, required: false },
  age: { type: Number, required: true, max: 150 },
  username: { type: String, unique: true, required: true, max: 100 },
  password: { type: String, required: true },
  telephone: { type: Number, required: true },
  avatar: { type: String, required: true },
};

export default userModelSchema;
