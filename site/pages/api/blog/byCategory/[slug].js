import connectDB from '../../../../utils/connectDB'
import Blogs from '../../../../models/blogModel'
import Categories from '../../../../models/categoryModel'
import Users from '../../../../models/userModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBlog(req, res)
            break;
    }
}


const getBlog = async (req, res) => {
    try {
        const { slug } = req.query;

        const category = await Categories.findOne({ slug: slug })
        if (!category) return res.status(400).json({ err: 'This category does not exist.' })

        const blogs = await Blogs.find({ categories: category._id, status: "published" }).populate({ path: "authors", model: Users, select: "-password" }).populate({ path: "categories", model: Categories })
        if (!blogs) return res.status(400).json({ err: 'No Blog Post Found' })

        res.json({ blogs })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}