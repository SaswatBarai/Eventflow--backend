// filepath: c:\Eventflow--backend\controllers\__tests__\passwordController.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';
import userModel from '../../models/user.model.js';
import cryptoRandomString from 'crypto-random-string';
import bcrypt from 'bcryptjs';

jest.mock('../../models/user.model.js');
jest.mock('crypto-random-string');
jest.mock('bcryptjs');


describe('Password Reset', () => {
  it('should send a password reset email', async () => {
    const email = 'test@example.com';
    const resetToken = 'resetToken123';
    cryptoRandomString.mockReturnValue(resetToken);

    userModel.findOne.mockResolvedValue({
      email,
      save: jest.fn(),
    });

    const response = await request(app)
      .post('/api/password/request-password-reset')
      .send({ email });

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Password reset email sent');
  });

  it('should reset the password', async () => {
    const token = 'resetToken123';
    const newPassword = 'newpassword';
    const hashedPassword = 'hashedpassword';
    bcrypt.hash.mockResolvedValue(hashedPassword);

    userModel.findOne.mockResolvedValue({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
      save: jest.fn(),
    });

    const response = await request(app)
      .post(`/api/password/reset-password/${token}`)
      .send({ password: newPassword });

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Password has been updated');
  });
});