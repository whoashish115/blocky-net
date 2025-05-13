import connectDB from "../../../../../utils/connectDB";
import Users from "../../../../../models/userModel";
import auth from "../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await saveBlog(req, res);
      break;
  }
};

const saveBlog = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { id } = req.query;

    const user = await Users.find({ _id: result.id, saved: id })
    if (user.length > 0) return res.status(400).json({ msg: "You saved this post." })

    const save = await Users.findOneAndUpdate({ _id: result.id }, {$push: { saved: id }   }, { new: true })

    if (!save) return res.status(400).json({ msg: 'This user does not exist.' })

    res.json({ msg: 'Blog Post Added to Save List' })
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
