
// adminController.js
import jwt from 'jsonwebtoken';
import adminUser from '../models/UserSchema.js';
import { generateOTP, sendOtpEmail } from '../helpers/genOtp.js' // Adjust the path as necessary
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();


export const changePasswordController = async (req, res) => {
    const { currentEmail, currentPassword, newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await adminUser.findOne({ email: currentEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};


  export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await adminUser.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
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
        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });

        // Set token in cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'None', // Adjust based on your setup
            maxAge: 3600000 // 1 hour
        });

        // Update user login status and clear OTP fields
        await adminUser.updateOne({ email }, { loginStatus: true, otp: null, otpExpiresAt: null });

        const msg = `${email} has logged in. Welcome !!!`;

        res.status(200).json({ msg, accessToken, email });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
