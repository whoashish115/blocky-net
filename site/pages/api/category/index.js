import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categoryModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()
        res.json({ categories })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}