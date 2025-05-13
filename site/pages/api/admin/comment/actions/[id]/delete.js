import connectDB from "../../../../../../utils/connectDB";
import Comments from "../../../../../../models/commentModel";
import Blogs from "../../../../../../models/blogModel";
import auth from "../../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "DELETE":
            await deleteComment(req, res);
            break;
    }
};

const deleteComment = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (result.role !== "admin")
            return res.status(400).json({ err: "Authentication is not valid." });
            
        const { id } = req.query;

        await Comments.findOneAndDelete({ _id: id, user: result.id })
        await Blogs.findOneAndUpdate({ _id: id }, { $pull: { comments: id } })

        res.json({ msg: 'Comment Deleted!' })

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
