import connectDB from "../../../utils/connectDB";
import Views from "../../../models/viewModel";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getViews(req, res);
            break;
        case "POST":
            await createUpdateView(req, res);
            break;
    }
};

const getViews = async (req, res) => {
    try {
        const { path } = req.query
        const views = await Views.find({ path })
        if (views.length == 0) return res.json({ msg: "No Views" });

        return res.json({ views: views.filter(view => !view.slug.includes("/admin")) });

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

const createUpdateView = async (req, res) => {
    try {
        const { slug, path, device } = req.query

        const viewsRelatedToSlug = await Views.findOne({ slug })
        if (viewsRelatedToSlug) {
            await Views.findOneAndUpdate({ _id: viewsRelatedToSlug._id }, { $push: { views: { device: device, visitedAt: new Date().toISOString() } }, }, { new: true })
        }
        else {
            const view = new Views({ slug: slug, path: path, views: [{ device: device, visitedAt: new Date().toISOString() }] })
            await view.save()
        }
        res.json({ msg: "views successfully counted" });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
