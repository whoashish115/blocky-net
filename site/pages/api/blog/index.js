import connectDB from '../../../utils/connectDB'
import Blogs from '../../../models/blogModel'
import Users from '../../../models/userModel'
import Categories from '../../../models/categoryModel'
import Comments from '../../../models/commentModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getBlogs(req, res)
            break;
    }
}

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category !== 'all')
            this.query.find({categories: queryObj.category})
        if(queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getBlogs = async (req, res) => {
    try {
        const features = new APIfeatures(Blogs.find({status:"published"}), req.query).filtering().sorting().paginating()

        const blogs = await features.query.populate({ path: "authors", model:Users, select: "-password"}).populate({ path: "categories", model:Categories})
        res.json({ status: 'success', result: blogs.length, blogs  })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}