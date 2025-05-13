import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default : "",
      maxlength:1000
    },
    password: {
      type: String,
      required: true,
    },
    root: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    saved: [{ type: mongoose.Types.ObjectId, ref: 'blog' }]
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);

export default Dataset;
