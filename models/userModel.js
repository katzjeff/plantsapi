import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: { type: String, required: true, unique: true },
});

export default mongoose.models?.Users || mongoose.model("User", userSchema);
