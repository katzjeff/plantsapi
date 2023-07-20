import mongoose from "mongoose";
const plantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  botanicalName: { type: String, required: true, minlength: 2, maxlength: 100 },
  plantName: { type: String, required: true, minlength: 2, maxlength: 100 },
  description: { type: String, require: true },
  flowerColor: { type: String, require: true },
  foodNutrients: { type: String, require: true },
  growthHabits: { type: String, require: true },
  waterRequirements: { type: String, required: true },
  nativeRegion: { type: String, required: true },
  companionPlants: { type: String, required: true },
  bloomingTimes: { type: String, required: true },
  plantHeight: { type: String, require: true },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          value
        );
      },
      message: "Invalid image URL format, please check.",
    },
  },
});

export default mongoose.models?.Plants || mongoose.model("Plants", plantSchema);
