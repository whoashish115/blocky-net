import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import Blogs from '../../../models/blogModel'
import Categories from '../../../models/categoryModel'
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, } from "../../../utils/generateToken";


connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await signin(req, res);
      break;
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email }).populate({ path: "saved", model: Blogs, populate: [{path: "authors", model: Users, select: "-password" },{ path: "categories", model:Categories}] });
    if (!user) return res.status(400).json({ err: "This user does not exist." });
    if (user.isBan) return res.status(400).json({ err: "User is banned due to violation of our terms and condition." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ err: "Incorrect password." });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });


    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        ...user._doc,
        password: "",
      },
    });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
