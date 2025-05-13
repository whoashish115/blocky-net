import connectDB from '../../../utils/connectDB'
import NavigationCategories from '../../../models/navigationCategoryModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getNavigationCategories(req, res)
            break;
    }
}


const getNavigationCategories = async (req, res) => {
    try {
        const navigationCategories = await NavigationCategories.find().sort({"index":1})
        res.json({ navigationCategories })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}