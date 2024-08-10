
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const generateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

export const sendOtpEmail = async (email, otp) => {
    try {
        const response = await axios.post(
            'https://api.sendinblue.com/v3/smtp/email',
            {
                sender: { email: process.env.sender, name: 'BuildWell' },
                to: [{ email }],
                subject: 'Your OTP Code',
                htmlContent: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>OTP Verification</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f9;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 40px auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
                            .header {
                                background-color: #007bff;
                                color: #ffffff;
                                text-align: center;
                                padding: 20px;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                                text-align: center;
                            }
                            .otp {
                                font-size: 28px;
                                font-weight: bold;
                                color: #007bff;
                                margin: 20px 0;
                            }
                            .footer {
                                background-color: #f4f4f9;
                                color: #777;
                                text-align: center;
                                padding: 10px;
                                font-size: 14px;
                            }
                            .button {
                                display: inline-block;
                                background-color: #007bff;
                                color: #ffffff;
                                padding: 10px 20px;
                                border-radius: 5px;
                                text-decoration: none;
                                font-size: 16px;
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                OTP Verification
                            </div>
                            <div class="content">
                                <p>Dear Admin,</p>
                                <p>Your One-Time Password (OTP) for login is:</p>
                                <div class="otp">${otp}</div>
                                <p>This OTP is valid for 90 seconds. Please enter it in the app to proceed.</p>
                            </div>
                            <div class="footer">
                                <p>Thank you for using our service.</p>
                                <p>If you did not request this OTP, please ignore this email.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            },
            {
                headers: {
                    'api-key': process.env.sendInBlueApiKey,
                    'Content-Type': 'application/json',
                },
            }
        );

    } catch (error) {
        console.error('Error sending OTP email:', error.response?.data || error.message);
        throw new Error('Error sending OTP email');
    }
};
