import adminUSer from '../models/UserSchema.js';

export const CheckNotExist = async (req, res, next) => {
    try {
         console.log(1212)
        const { email, password } = req.body;
        console.log(typeof(email),password)

        const allUsers = await adminUSer.find();
        console.log(allUsers)

        const userRequest = await adminUSer.findOne({ email });
         console.log(userRequest)
        if (!userRequest) {
            return res.status(422).json({ error: 'EMAIL NOT PRESENT' });
        }
         console.log(userRequest)
        if (userRequest.password !== password) {
            return res.status(422).json({ error: 'PASSWORD NOT MATCHED' });
        }
         console.log(13131)
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
