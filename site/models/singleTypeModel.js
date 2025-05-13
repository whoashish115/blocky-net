import mongoose from "mongoose";

const singleTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content:Object
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.singleType || mongoose.model("singleType", singleTypeSchema);

export default Dataset;
