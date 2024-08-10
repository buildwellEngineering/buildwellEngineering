// import jwt from 'jsonwebtoken';

// export const verifyToken = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];

//         if (!token) {
//             return res.status(422).send("SEND REQUEST WITH TOKEN !!!");
//         }

//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(402).send("UNAUTHORIZED ACCESS !!!");
//             } else {
//                 next();
//             }
//         });
//     } catch (error) {
//         res.status(500).send("INTERNAL SERVER ERROR");
//     }
// };



// import jwt from 'jsonwebtoken';
// import adminUser from './models/adminUser'; // Adjust the import path as needed

// export const authenticateToken = async (req, res, next) => {
//     const token = req.cookies.accessToken;

//     if (!token) {
//         // No token provided, set loginStatus to false
//         const { email } = req.body; // Assuming email is provided in the request body

//         if (email) {
//             await adminUser.updateOne({ email }, { loginStatus: false });
//         }

//         return res.status(401).json({ error: 'No token provided, login status set to false', loginStatus: false });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//         req.user = decoded; // Attach user info to request
//         next();
//     } catch (error) {
//         return res.status(403).json({ error: 'Invalid token' });
//     }
// };



import jwt from 'jsonwebtoken';
import adminUser from '../models/UserSchema.js'; // Adjust the import path as needed

export const authenticateToken = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        // No token provided
        return res.status(401).json({ error: 'No token provided', loginStatus: false });
    }

    try {
        // Verify token and extract payload
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // Extract email from token
        const { email } = decoded;

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        // Handle token errors, including expired tokens
        if (error.name === 'TokenExpiredError') {
            const token = req.cookies.accessToken;
            // Extract email from token (if available) or handle error
            let email;
            try {
                const decoded = jwt.decode(token); // Decode without verification to get email
                email = decoded?.email;
            } catch (decodeError) {
                // Handle decoding error (e.g., token is malformed)
                return res.status(401).json({ error: 'Invalid token', loginStatus: false });
            }

            // Set login status to false if email is available
            if (email) {
                await adminUser.updateOne({ email }, { loginStatus: false });
            }

            return res.status(401).json({ error: 'Token expired, login status set to false', loginStatus: false });
        }

        // For other errors
        return res.status(403).json({ error: 'Invalid token' });
    }
};
