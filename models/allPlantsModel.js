import mongoose from "mongoose";
const plantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  plantName: { type: String, required: true },
  flowerColor: { type: String, required: true },
  foodNutrients: { type: String, required: true },
  waterRequirements: { type: String, required: true },
  nativeRegion: { type: String, required: true },
  companionPlants: { type: String, required: true },
  bloomingTimes: { type: String, required: true },
  imageUrl: { type: String, required: true },
  plantHeight: { type: Number },
});

export default mongoose.models?.Plants || mongoose.model("Plants", plantSchema);
