import connectDB from '../../../../utils/connectDB'
import Blogs from '../../../../models/blogModel'
import Categories from '../../../../models/categoryModel'


connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await searchBlogs(req, res)
            break;
    }
}

const searchBlogs = async (req, res) => {
    try {
        const { search } = req.query
        const blogs = await Blogs.find({ status:"published", $text: { $search: `\`${search}\``  }},{limit:15}).select("title description thumbnail slug createdAt").populate({ path: "categories", model:Categories})
        res.json({ blogs })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}