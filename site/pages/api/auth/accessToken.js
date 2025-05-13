import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Blogs from '../../../models/blogModel'
import Categories from '../../../models/categoryModel'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
    try {

        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ err: 'Please login now!' })

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if (!result) return res.status(400).json({ err: 'Your token is incorrect or has expired.' })

        const user = await Users.findById(result.id).populate({ path: "saved", model: Blogs, populate: [{path: "authors", model: Users, select: "-password" },{ path: "categories", model:Categories}]})
        if (!user) return res.status(400).json({ err: 'User does not exist.' })

        if (user.isBan) return res.status(400).json({ err: 'User is Banned due to violation of our terms and condition.' })

        const access_token = createAccessToken({ id: user._id })

        res.json({
            access_token,
            user: {
                ...user._doc,
                password: "",
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

