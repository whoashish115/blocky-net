import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateUser(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    if (!result.root)
      return res.status(400).json({ err: "This method is only for root admins" });


    const { id } = req.query;
    const { role, isBan } = req.body;

    await Users.findOneAndUpdate(
      { _id: id },
      {
        role: role,
        isBan: isBan,
      }
    );

    res.json({ msg: "User Updated" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    if (!result.root)
      return res.status(400).json({ err: "This method is only for root admins" });

    const { id } = req.query;

    await Users.findByIdAndDelete({ _id: id });
    res.json({ msg: "User Deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
