import connectDB from "../../../../../utils/connectDB";
import Comments from "../../../../../models/commentModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await likeComment(req, res);
      break;
  }
};

const likeComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    // Checking User Already Liked
    const comment = await Comments.find({_id: id, likes: result.id})
    if(comment.length > 0) return res.status(400).json({msg: "You already liked this comment"})

     const like = await Comments.findOneAndUpdate({_id: id}, {$push: {likes: result.id}}, {new: true})
    if (!like) return res.status(400).json({ msg: 'This Comment does not exists' })

    res.json({msg: 'Comment Liked'})

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
