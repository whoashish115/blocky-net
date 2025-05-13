import connectDB from '../../../../../utils/connectDB'
import Blogs from '../../../../../models/blogModel'
import auth from '../../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBlog(req, res)
            break;
        case "PUT":
            await updateBlog(req, res)
            break;
        case "DELETE":
            await deleteBlog(req, res)
            break;
    }
}

const getBlog = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query

        const blog = await Blogs.findById(id)
        if (!blog) return res.status(400).json({ err: 'This blog does not exist.' })

        res.json({ blog })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const updateBlog = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query
        const { title, description, slug, tags, status, thumbnail, htmlContent, markdownContent, authors, categories } = req.body

        if (!title || !description || !slug || !thumbnail || !htmlContent || !markdownContent || categories.length == 0 || authors.length == 0)
            return res.status(400).json({ err: 'Please add all the fields.' })

        await Blogs.findOneAndUpdate({ _id: id }, {
            title, description, slug, status, thumbnail, tags, htmlContent, markdownContent, authors, categories
        })

        res.json({ msg: 'Blog Updated' })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


const deleteBlog = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication is not valid.' })
        const { id } = req.query;

        await Blogs.findByIdAndDelete({ _id: id })
        res.json({ msg: 'Blog Deleted!' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}