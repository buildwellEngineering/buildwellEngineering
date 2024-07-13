import jwt from 'jsonwebtoken';
import adminUser from "../models/UserSchema.js";

export const adminLogin = async (req, res) => {
    try {
        const { email } = req.body;

        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        


        await adminUser.updateOne({ email }, { loginStatus: true});

        const msg = `${email} has logged in. Welcome !!!`;

        res.status(200).send({ msg, accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
    
}