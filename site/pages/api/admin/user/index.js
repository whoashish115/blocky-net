import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";
import valid from "../../../../utils/validate";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      break;
    case "POST":
      await createUser(req, res);
      break;
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    if (result.root !== true)
      return res.status(400).json({ err: "This method is only for root admins" });

    const { name, email, password, cf_password, avatar } = req.body;
    if (!name || !email || !password || !cf_password)
      return res.status(400).json({ err: "Please add all the fields." });

    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new Users({ name, email, password: passwordHash,avatar:avatar && avatar });
    await newUser.save();

    res.json({ msg: "New User created" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
