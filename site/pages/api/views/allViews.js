import connectDB from "../../../utils/connectDB";
import Views from "../../../models/viewModel";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getAllViews(req, res);
            break;
    }
};

const getAllViews = async (req, res) => {
    try {
        const views = await Views.find()
        if(views.length == 0) return res.json({ msg: "No Views" });

        return res.json({ views: views.filter(view => !view.slug.includes("/admin")) });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
