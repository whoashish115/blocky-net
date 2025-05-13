import connectDB from "../../../../../utils/connectDB";
import Users from "../../../../../models/userModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await unSaveBlog(req, res);
      break;
  }
};

const unSaveBlog = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    const unsave = await Users.findOneAndUpdate({ _id: result.id }, {$pull: { saved: id }}, { new: true })
    if (!unsave) return res.status(400).json({ msg: 'This user does not exist.' })

    res.json({ msg: 'Blog Post Removed from Save List' })
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
