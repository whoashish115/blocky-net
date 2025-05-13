import connectDB from '../../../../utils/connectDB'
import Blogs from '../../../../models/blogModel'
import Users from '../../../../models/userModel'
import Comments from '../../../../models/commentModel'
import Categories from '../../../../models/categoryModel'

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

        const blog = await Blogs.findOne({ slug: slug, status: "published" }).populate({ path: "likes dislikes", select: "avatar name", model: Users }).populate({ path: "authors comments", model: Comments, populate: { path: "user likes dislikes heartUser", model: Users, select: "-password" } }).populate({ path: "categories", model: Categories, })
        if (!blog) return res.status(400).json({ err: 'This blog does not exist.' })

        const nextBlog = await Blogs.findOne({ status: "published", createdAt: { $gt: blog.createdAt } }).populate({ path: "categories", model: Categories })
        const prevBlog = await Blogs.find({ status: "published", _id: { $lte: blog._id } }).sort({ _id: -1 }).limit(2).populate({ path: "categories", model: Categories })

        await Blogs.aggregate([{ $match: { status: "published" } }, { $match: { tags: { $in: blog.tags } } }, { $match: { categories: { $in: blog.categories } } }, { $match: { _id: { $ne: blog._id } } }, { $sample: { size: 2 } }]).exec(async function (err, blogs) {Blogs.populate(blogs,{ path: "categories", model: Categories },function (err, newBlogs) {return res.json({ blog, nextBlog, prevBlog: prevBlog[1], relatedBlogs: newBlogs })})});

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}
