import mongoose from "mongoose";

const navigationCategorySchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.navigationCategory || mongoose.model("navigationCategory", navigationCategorySchema);
export default Dataset;
