import connectDB from '../../../../utils/connectDB'
import Users from '../../../../models/userModel'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
    try {
        const token = req.body.activation_token;
        const user = jwt.verify(token,process.env.ACTIVATION_TOKEN_SECRET)
        if (!user) {
            return res.status(400).json({ msg: "This link is expired .Register again to get new link" });
        }
        const { name, email, password } = user;

        const check = await Users.findOne({ email });
        if (check) return res.status(400).json({ msg: "This email already exists" });

        const newUser = new Users({ name, email, password });
        await newUser.save();

        return res.json({ msg: "Account has been activated !" });

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

