import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    htmlContent: {
      type: String,
      required: true,
    },
    markdownContent: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    authors: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "category",
      },
    ],
    tags: Array,
    status: {
      type: String,
      default: "draft"  //published or draft
    },
    views: {
      type: Number,
      default:0
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "user"}],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "user"}],
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default Dataset;
