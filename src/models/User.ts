import { model, Schema, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, minLength: 3, required: true },
  phone: { type: Number, minLength: 3, required: true },
  age: { type: Number, min: 10, max: 99 },
  email: { type: String, minLength: 3, required: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    alley: { type: String, required: true },
  },
  createdAt: { type: Date, default: () => Date.now() },
});
const User = models.User || model("User", userSchema);

export default User;
