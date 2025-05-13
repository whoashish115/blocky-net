import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import valid from '../../../utils/validate'
import {createActivationToken} from "../../../utils/generateToken"
import {sendMail} from "../../../utils/sendMail"
import bcrypt from 'bcrypt'


connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await signup(req, res)
            break;
    }
}

const signup = async (req, res) => {
    try {
        const { firstname,lastname, email, password, cf_password } = req.body
        const name = `${firstname} ${lastname}`
        
        const errMsg = valid(name, email, password, cf_password)
        if (errMsg) return res.status(400).json({ err: errMsg })
        
        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ err: 'This email already exists.' })
        
        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = { name, email, password: passwordHash, cf_password}

        const activation_token = createActivationToken(newUser);
        const url = `${process.env.CLIENT_URL}/auth/user/activate/${activation_token}`;

        sendMail(email, "Email Verification", "Verify Your Email To Complete Registration On novaSocial",`${url}`);

        res.json({msg: "Register Success! Please activate your email to start"});

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}