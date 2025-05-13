import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { sendMail } from "../../../utils/sendMail";
import { createAccessToken } from "../../../utils/generateToken";
import auth from "../../../middleware/auth"
import bcrypt from "bcrypt"

connectDB();

export default async (req, res) => {
  try {
    const result = await auth(req, res)
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);

    await Users.findOneAndUpdate( { _id:  result.id },{password: passwordHash,});
    res.json({ msg: "Password successfully changed!" });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
