import connectDB from "../../../utils/connectDB";
import Reports from "../../../models/reportModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await report(req, res);
            break;
    }
};

const report = async (req, res) => {
    try {
        await auth(req, res);
        const { subject, message, blog, comment, user } = req.body
        if (!subject || !message || !user) return res.status(500).json({ err: "Invalid Information" });

        const report = new Reports({ subject, message, type: comment ? 1 : 0, comment: comment ? comment : "", blog: blog ? blog : "", user })
        await report.save()

        return res.json({success:"Report Successfully Recorded"});

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
