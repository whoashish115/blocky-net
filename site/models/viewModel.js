import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique:true
    },
    views: [{ 
      device: {
        type:String,
        default:"mobile"
      },
      visitedAt:{
        type:String,
        required:"true"
      }
     }]
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.view || mongoose.model("view", viewSchema);

export default Dataset;
