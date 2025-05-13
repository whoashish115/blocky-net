import connectDB from "../../../../../utils/connectDB";
import Blogs from "../../../../../models/blogModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await removeDislikeBlog(req, res);
            break;
    }
};

const removeDislikeBlog = async (req, res) => {
    try {
        const result = await auth(req, res);
        const { id } = req.query;

        const dislike = await Blogs.findOneAndUpdate({ _id: id }, { $pull: { dislikes: result.id } }, { new: true })
        if (!dislike) return res.status(400).json({ msg: 'This blog post does not exist.' })

        res.json({ msg: 'Removed Dislike From Blog Post' })

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

