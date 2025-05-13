import connectDB from '../../../utils/connectDB'
import Blogs from '../../../models/blogModel'
import Users from '../../../models/userModel'
import Categories from '../../../models/categoryModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBlogs(req, res)
            break;
    }
}

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find({}).populate({ path: "authors", model:Users, select: "-password"}).populate({ path: "categories", model:Categories})
        res.json({  blogs  })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}