import connectDB from '../../../../../utils/connectDB'
import Blogs from '../../../../../models/blogModel'
import auth from '../../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await changeStatus(req, res)
            break;
    }
}


const changeStatus = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query
        const { status } = req.body

        if (!status) return res.status(400).json({ err: 'Please add all the fields.' })
        await Blogs.findOneAndUpdate({ _id: id }, {status})

        res.json({ msg: 'Blog Updated' })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}
