import mongoose from "mongoose";

const navigationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    children: [{
      type: mongoose.Types.ObjectId,
      ref: "navigation",
    }],
    parents: [{
      type: mongoose.Types.ObjectId,
      ref: "navigation",
    }],
    isChildren: {
      type: Boolean,
      default:false
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "navigationCategory",
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.navigation || mongoose.model("navigation", navigationSchema);
export default Dataset;
