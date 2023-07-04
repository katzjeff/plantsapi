import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true, unique: true },
});

export default mongoose.models?.Users || mongoose.model("User", userSchema);
