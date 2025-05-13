import connectDB from "../../../../../utils/connectDB";
import Comments from "../../../../../models/commentModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await removeDislikeComment(req, res);
      break;
  }
};

const removeDislikeComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    const dislike = await Comments.findOneAndUpdate({_id: id}, {$pull: {dislikes: result.id}}, {new: true})
    if (!dislike) return res.status(400).json({ msg: 'This comment does not exist.' })

    res.json({msg: 'Removed Dislike From Comment'})

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
