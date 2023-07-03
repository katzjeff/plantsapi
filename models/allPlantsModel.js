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



// import mongoose from "mongoose";

// const plantSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   botanicalName: { type: String },
//   plantName: { type: String, required: true },
//   description: { type: String },
//   flowerColor: { type: String, required: true },
//   foodNutrients: { type: String, required: true },
//   growthHabits: { type: String },
//   waterRequirements: { type: String, required: true },
//   nativeRegion: { type: String, required: true },
//   bloomingTimes: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   plantHeight: { type: String },
  
//   growingRequirements: {
//     sunlightRequirements: { type: String },
//     waterRequirements: { type: String },
//     soilType: { type: String },
//     tempRange: { type: String },
//   },
  
//   companionPlants: [{ type: String }],
// });

// export default mongoose.models?.Plants || mongoose.model("Plants", plantSchema);
