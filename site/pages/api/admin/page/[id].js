import connectDB from '../../../../utils/connectDB'
import Pages from '../../../../models/pageModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getPage(req, res)
            break;
        case "PUT":
            await updatePage(req, res)
            break;
        case "DELETE":
            await deletePage(req, res)
            break;
    }
}

const getPage = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query

        const page = await Pages.findById(id)
        if (!page) return res.status(400).json({ err: 'This Page does not exist.' })

        res.json({ page })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const updatePage = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query
        const { title, slug,htmlContent,markdownContent } = req.body

        if (!title || !slug || !htmlContent || !markdownContent)
            return res.status(400).json({ err: 'Please add all the fields.' })

        await Pages.findOneAndUpdate({ _id: id }, {title, slug,htmlContent,markdownContent})

        res.json({ msg: 'Page Updated' })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


const deletePage = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query;

        await Pages.findByIdAndDelete({ _id: id })
        res.json({ msg: 'Page Deleted!' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}