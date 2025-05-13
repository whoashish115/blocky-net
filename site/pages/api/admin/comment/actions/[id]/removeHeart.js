import connectDB from "../../../../../../utils/connectDB";
import Comments from "../../../../../../models/commentModel";
import auth from "../../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await removeHeartComment(req, res);
      break;
  }
};

const removeHeartComment = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    if (result.root == true) {
      const heart = await Comments.findOneAndUpdate({ _id: id }, { heart: false }, { new: true })
      if (!heart) return res.status(400).json({ msg: 'This Comment does not exists' })
    }
    else{
      const comment = await Comments.find({ _id: id, heart: true }).populate({path:"heartUser",select:"-password"})
      if (comment.length > 0) return res.status(400).json({ msg: `You Cannot Remove Heart Given By Another Admin (${comment[0].heartUser.name})` })

      const heartedByUser = await Comments.find({ _id: id, heart: false})
      if (heartedByUser.length > 0) return res.status(400).json({ msg: "Comment Heart Already Removed" })

      const heart = await Comments.findOneAndUpdate({ _id: id }, { heart: false, heartUser: {} }, { new: true })
      if (!heart) return res.status(400).json({ msg: 'This Comment does not exists' })
    }
    
    res.json({ msg: 'Comment Heart Remove' })

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
