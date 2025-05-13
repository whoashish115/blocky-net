import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from '../../../../middleware/auth'

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await updateProfile(req, res);
            break;
    }
};

const updateProfile = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { name, avatar } = req.body;

        if (!avatar) return res.status(500).json({ msg: "Please add your Avatar" })
        if (!name) return res.status(500).json({ msg: "Please add your fullname" })
        
        const user = await Users.findOneAndUpdate({ _id: result.id }, {name, avatar })
        if(!user) return res.status(500).json({ msg: "User does not exists" })

        res.json({ msg: "Profile Updated" })
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
