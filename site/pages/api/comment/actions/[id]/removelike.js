import connectDB from "../../../../../utils/connectDB";
import Comments from "../../../../../models/commentModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await removeLikeComment(req, res);
      break;
  }
};

const removeLikeComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    const like = await Comments.findOneAndUpdate({_id: id}, {$pull: {likes: result.id}}, {new: true})
    if (!like) return res.status(400).json({ msg: 'This comment does not exist' })

    res.json({msg: 'Removed like From Comment'})

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
