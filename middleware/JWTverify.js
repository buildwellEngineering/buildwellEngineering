

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
