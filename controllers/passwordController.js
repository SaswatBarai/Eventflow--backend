import cryptoRandomString from 'crypto-random-string';
import userModel from '../models/user.model.js';
import transporter from '../configs/nodemailer.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const resetToken = cryptoRandomString({ length: 32, type: 'url-safe' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetUrl}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ msg: 'Password has been updated' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


