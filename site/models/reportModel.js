import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: Number, // 0 - blog ; 1- comment
            required: true,
            default:0
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        blog: { type: mongoose.Types.ObjectId, ref: 'blog', required: false },
        comment: { type: mongoose.Types.ObjectId, ref: 'comment', required: false },
        user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },

    },
    {
        timestamps: true,
    }
);

let Dataset = mongoose.models.report || mongoose.model("report", reportSchema);
export default Dataset;
