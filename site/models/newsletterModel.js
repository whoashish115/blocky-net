import mongoose from "mongoose";

const newsletter = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.newsletter || mongoose.model("newsletter", newsletter);
export default Dataset;
