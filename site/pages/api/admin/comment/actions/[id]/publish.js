import connectDB from "../../../../../../utils/connectDB";
import Comments from "../../../../../../models/commentModel";
import auth from "../../../../../../middleware/auth";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await publishComment(req, res);
            break;
    }
};

const publishComment = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (result.role !== "admin")
            return res.status(400).json({ err: "Authentication is not valid." });

        const { id } = req.query;

        const heart = await Comments.findOneAndUpdate({ _id: id }, { published: true }, { new: true })
        if (!heart) return res.status(400).json({ msg: 'This Comment does not exists' })

        res.json({ msg: 'Comment Published' })

    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
