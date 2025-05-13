import connectDB from "../../../../../utils/connectDB";
import Blogs from "../../../../../models/blogModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await dislikeBlog(req, res);
      break;
  }
};

const dislikeBlog = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    // Checking User Already Disliked
    const isDislikeBlog = await Blogs.find({ _id: id, dislikes: result.id})
    if (isDislikeBlog.length > 0) return res.status(400).json({ msg: "You already disliked this blog post." })

    const dislike = await Blogs.findOneAndUpdate({ _id: id}, { $push: { dislikes: result.id } }, { new: true })
    if (!dislike) return res.status(400).json({ msg: 'This blog post does not exist.' })

    res.json({ msg: 'Blog Post Disliked' })

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

