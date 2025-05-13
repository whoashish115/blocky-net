import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    markdownContent: {
      type: String,
      required: true,
    },
    htmlContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.page || mongoose.model("page", pageSchema);

export default Dataset;
