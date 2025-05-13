import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUser(req, res);
      break;
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await Users.findOne({_id : id}).select("-password");
    if (!user) return res.status(400).json({ err: "This user does not exist." });

    res.json({ user });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
