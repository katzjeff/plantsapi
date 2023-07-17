import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String },
  email: {type: String},
  password: { type: String },
});

export default mongoose.models?.Users || mongoose.model("User", userSchema);
