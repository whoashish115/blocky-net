import connectDB from '../../../../utils/connectDB'
import Blogs from '../../../../models/blogModel'
import Categories from '../../../../models/categoryModel'
import Users from '../../../../models/userModel'
import Comments from '../../../../models/commentModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBlogs(req, res)
            break;
        case "POST":
            await createBlog(req, res)
            break;
    }
}

const getBlogs = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: "Authentication is not valid" })

        const blogs = await Blogs.find().populate({path:"likes dislikes",select: "avatar name",model: Users} ).populate({ path: "authors comments", model: Comments, populate: { path: "user likes dislikes heartUser", model: Users, select: "-password" } }).populate({ path: "categories", model: Categories, })
        res.json({ blogs })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const createBlog = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication is not valid.' })

        const { title, description, slug, thumbnail,tags, htmlContent,status, markdownContent,authors,categories } = req.body

        if (!title || !description || !slug || !thumbnail || !htmlContent || !markdownContent || authors.length == 0|| categories.length == 0)
            return res.status(400).json({ err: 'Please add all the fields.' })

        const blog = await Blogs.findOne({ slug })
        if (blog) return res.status(400).json({ err: 'Blog slug already exists.' })

        const newBlog = new Blogs({ title,tags,status, description, slug, thumbnail, htmlContent, markdownContent,categories,authors })

        await newBlog.save()

        res.json({ msg: 'new blog Created' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}