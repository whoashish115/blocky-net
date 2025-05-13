import connectDB from "../../../../../utils/connectDB";
import Comments from "../../../../../models/commentModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await dislikeComment(req, res);
      break;
  }
};

const dislikeComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    // Checking User Already Disliked
    const comment = await Comments.find({ _id: id, dislikes: result.id })
    if (comment.length > 0) return res.status(400).json({ msg: "You already disliked this comment" })

    const dislike = await Comments.findOneAndUpdate({ _id: id }, { $push: { dislikes: result.id } }, { new: true })
    if (!dislike) return res.status(400).json({ msg: 'This Comment does not exists' })

    res.json({ msg: 'Comment Disliked' })

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
