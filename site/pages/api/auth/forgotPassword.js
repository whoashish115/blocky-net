import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import {sendMail} from "../../../utils/sendMail"
import {createAccessToken} from "../../../utils/generateToken"

connectDB()

export default async (req, res) => {
    try {
        const { email } = req.body

        const user = await Users.findOne({ email })
        // if (!user) return res.status(400).json({ msg: "This email does not exist." })

        const access_token = createAccessToken({ id: user._id })
        const url = `${process.env.BASE_URL}/auth/resetpassword/${access_token}`
        sendMail(email, "BLOG Password Reset ","Reset Your Password to Login to novaSocial", `${url}`)

        return res.json({ msg: "Re-create the password, please check your email." })
     
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

