import connectDB from "../../../utils/connectDB";
import Blogs from "../../../models/blogModel";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await updateViewCount(req, res);
            break;
    }
};

const updateViewCount = async (req, res) => {
    try {
        const { slug } = req.query;
        
        const blog = await Blogs.findOne({ slug: slug });
        if (!blog) return res.status(400).json({ msg: "Blog Does not exist" });

        
        const blognew = await Blogs.findOneAndUpdate({ _id: blog._id }, {views:blog.views + 1}, { new: true });

        return res.json({ msg: "Blog Post View Counted" });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
