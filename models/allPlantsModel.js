import mongoose from "mongoose";
const plantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  botanicalName: { type: String },
  plantName: { type: String, required: true },
  description: { type: String },
  flowerColor: { type: String, required: true },
  foodNutrients: { type: String, required: true },
  growthHabits: { type: String },
  waterRequirements: { type: String, required: true },
  nativeRegion: { type: String, required: true },
  companionPlants: { type: String, required: true },
  bloomingTimes: { type: String, required: true },
  imageUrl: { type: String, required: true },
  plantHeight: { type: String },
});

export default mongoose.models?.Plants || mongoose.model("Plants", plantSchema);

// {
//   "id": 1,x
//   "botanicalName": "Lavandula angustifolia",x
//   "name": "Lavender",x
//   "description": "Aromatic perennial shrub with narrow, gray-green leaves and spikes of purple flowers.",x
//   "growthHabits": "Perennial",x
//   "floweringSeason": "Summer",x
//   "growingRequirements": {
//       "sunlightRequirements": "Full sun",
//       "waterRequirements": "Moderate",
//       "soliType": "Well-drained",
//       "tempRange": "50-90°F"
//   },
//   "nativeRegion": "Mediterranean",x
//   "companionPlants": [
//       "Rosemary",
//       "Sage",
//       "Chives"
//   ],
//   "flowerColor": "Purple",x
//   "imageUrl": "./assets/plantImages/lavender.png",x
//   "plantHeight": "2-3 feet"x
// },
//research on how to create an object and array in the model
