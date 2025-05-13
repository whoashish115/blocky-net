import connectDB from "../../../../../utils/connectDB";
import Blogs from "../../../../../models/blogModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await likeBlog(req, res);
      break;
  }
};

const likeBlog = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    // Checking User Already Liked
    const isLikedBlog = await Blogs.find({ _id: id, likes: result.id});
    if (isLikedBlog.length > 0) return res.status(400).json({ msg: "You already liked this blog post." });

    const like = await Blogs.findOneAndUpdate( { _id: id }, { $push: { likes: result.id } }, { new: true });
    if (!like)return res.status(400).json({ msg: "This blog post does not exist." });

    res.json({ msg: "Blog Post Liked" });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
