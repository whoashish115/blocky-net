import connectDB from "../../../../../utils/connectDB";
import Blogs from "../../../../../models/blogModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await removeLikeBlog(req, res);
            break;
    }
};

const removeLikeBlog = async (req, res) => {
    try {
        const result = await auth(req, res);
        const { id } = req.query;

        const like = await Blogs.findOneAndUpdate({ _id: id }, { $pull: { likes: result.id } }, { new: true })
        if (!like) return res.status(400).json({ msg: 'This blog post does not exist.' })

        res.json({ msg: 'Removed Like From Blog Post' })

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
