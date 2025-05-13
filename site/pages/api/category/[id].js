import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categoryModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getCategory(req, res)
            break;
    }
}




const getCategory = async (req, res) => {
    try {
        const { id } = req.query;

        const category = await Categories.findById(id)
        if (!category) return res.status(400).json({ err: 'This category does not exist.' })

        res.json({ category })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}