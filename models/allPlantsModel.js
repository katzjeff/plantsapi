import mongoose from "mongoose";
const plantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

})

export default mongoose.models?.Plants || mongoose.model("Plants", plantSchema);