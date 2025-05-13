import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.category || mongoose.model("category", categorySchema);
export default Dataset;
