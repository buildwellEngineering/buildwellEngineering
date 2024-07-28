// import jwt from 'jsonwebtoken';
// import adminUser from "../models/UserSchema.js";

// export const adminLogin = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        


//         await adminUser.updateOne({ email }, { loginStatus: true});

//         const msg = `${email} has logged in. Welcome !!!`;

//         res.status(200).send({ msg, accessToken });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
    
// }



// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import adminUser from '../models/UserSchema.js';
// import dotenv from 'dotenv';
// import crypto from 'crypto';

// dotenv.config();

// const generateOTP = () => {
//     return crypto.randomInt(100000, 1000000).toString();
// };

// const sendOtpEmail = async (email, otp) => {
//     try {
//         const response = await axios.post(
//             'https://api.sendinblue.com/v3/smtp/email',
//             {
//                 sender: { email: process.env.sender, name: 'BuildWell' },
//                 to: [{ email }],
//                 subject: 'Your OTP Code',
//                 textContent: `Your OTP code is ${otp}. It will expire in 90 seconds.`,
//             },
//             {
//                 headers: {
//                     'api-key': process.env.sendInBlueApiKey,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         console.log('Email sent successfully:', response.data);
//     } catch (error) {
//         console.error('Error sending OTP email:', error.response?.data || error.message);
//         throw new Error('Error sending OTP email');
//     }
// };

// export const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await adminUser.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         // (Optional) Verify password here if you choose to handle password checking in a different way.
//         if(user.password !== password){
//             return res.status(400).json({ error: 'Invalid email or password !!'})
//         }

//         // Generate OTP and expiration time
//         const otp = generateOTP();
//         const otpExpiresAt = new Date(Date.now() + 90 * 1000); // 90 seconds from now

//         // Update user with OTP and expiration time
//         await adminUser.updateOne({ email }, { otp, otpExpiresAt });

//         // Send OTP via email
//         await sendOtpEmail(email, otp);

//         res.status(200).json({ msg: 'OTP sent to your email. Please verify to continue.' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// export const verifyOtp = async (req, res) => {
//     try {
//         const { email, otp } = req.body;

//         // Find the user by email
//         const user = await adminUser.findOne({ email });

//         if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
//             return res.status(400).json({ error: 'Invalid or expired OTP' });
//         }

//         // Generate access token
//         const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

//         // Update user login status and clear OTP fields
//         await adminUser.updateOne({ email }, { loginStatus: true, otp: null, otpExpiresAt: null });

//         const msg = `${email} has logged in. Welcome !!!`;

//         res.status(200).json({ msg, accessToken });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };


// adminController.js
import jwt from 'jsonwebtoken';
import adminUser from '../models/UserSchema.js';
import { generateOTP, sendOtpEmail } from '../helpers/genOtp.js' // Adjust the path as necessary
import dotenv from 'dotenv';

dotenv.config();

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await adminUser.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Verify password
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password !!' });
        }

        // Generate OTP and expiration time
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 90 * 1000); // 90 seconds from now

        // Update user with OTP and expiration time
        await adminUser.updateOne({ email }, { otp, otpExpiresAt });

        // Send OTP via email
        await sendOtpEmail(email, otp);

        res.status(200).json({ msg: 'OTP sent to your email. Please verify to continue.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the user by email
        const user = await adminUser.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // Generate access token
        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        // Update user login status and clear OTP fields
        await adminUser.updateOne({ email }, { loginStatus: true, otp: null, otpExpiresAt: null });

        const msg = `${email} has logged in. Welcome !!!`;

        res.status(200).json({ msg, accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

