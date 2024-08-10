import adminUSer from '../models/UserSchema.js';

export const CheckNotExist = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // const allUsers = await adminUSer.find();

        const userRequest = await adminUSer.findOne({ email });
        if (!userRequest) {
            return res.status(422).json({ error: 'EMAIL NOT PRESENT' });
        }
        if (userRequest.password !== password) {
            return res.status(422).json({ error: 'PASSWORD NOT MATCHED' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
