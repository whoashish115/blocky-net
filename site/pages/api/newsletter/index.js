import connectDB from "../../../utils/connectDB";
import Newsletters from "../../../models/newsletterModel";
import { validateEmail } from "../../../utils/validate"

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await createSubscription(req, res);
            break;
    }
};

const createSubscription = async (req, res) => {
    try {
        const { email } = req.body
        const validation = validateEmail(email)
        if (!validation) return res.status(500).json({ err: "email is not valid" });

        const newsletters = await Newsletters.findOne({email})
        if (newsletters) return res.status(500).json({ err: "Email Already Have subscription" });

        const newNewsletter = new Newsletters({ email: email })
        await newNewsletter.save()

        res.json({ msg: "Thanks For Subscribing Our Newsletter" });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};
