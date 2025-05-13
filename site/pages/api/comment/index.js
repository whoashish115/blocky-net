import connectDB from "../../../utils/connectDB";
import Comments from "../../../models/commentModel";
import Blogs from "../../../models/blogModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await postComment(req, res);
      break;
  }
};

const postComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { content, blogId, reply, tag } = req.body;

    if (!content || !result.id || !blogId)
      return res.status(400).json({ err: "Please add all the fields." });

    const comment = new Comments({ content, user: result.id, blogId, reply, tag });
    await comment.save();

    await Blogs.findOneAndUpdate(
      { _id: blogId },
      {
        $push: { comments: comment._id },
      },
      { new: true }
    );

    const populatedComment = await Comments.findById(comment._id).populate({ path: "user", select: "-password" });
    res.json({
      success: "Comment Added successfully",
      comment: populatedComment,
    });
    
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
