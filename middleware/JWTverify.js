import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(422).send("SEND REQUEST WITH TOKEN !!!");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.status(402).send("UNAUTHORIZED ACCESS !!!");
            } else {
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
};
