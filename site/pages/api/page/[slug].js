import connectDB from '../../../utils/connectDB'
import Pages from '../../../models/pageModel'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getPage(req, res)
            break;
    }
}


const getPage = async (req, res) => {
    try {
        const { slug } = req.query;

        const page = await Pages.findOne({slug:slug})
        if (!page) return res.status(400).json({ err: 'This page does not exist.' })

        res.json({ page:page})

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}