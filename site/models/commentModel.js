import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    heart: { type: Boolean, default: false},
    heartUser: { type: mongoose.Types.ObjectId, ref: "user" },
    edited: { type: Boolean, default: false},
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    blogId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.comment || mongoose.model("comment", commentSchema);

export default Dataset;
