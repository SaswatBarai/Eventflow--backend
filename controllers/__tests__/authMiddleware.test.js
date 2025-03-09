// filepath: c:\Eventflow--backend\middlewares\__tests__\authMiddleware.test.js
import jwt from 'jsonwebtoken';
import authMiddleware from '../../middlewares/authMiddleware.js';


jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  it('should call next if token is valid', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer validtoken'),
    };
    const res = {};
    const next = jest.fn();

    jwt.verify.mockReturnValue({ id: 'userId' });

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: 'userId' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'No token, authorization denied' });
  });

  it('should return 401 if token is invalid', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer invalidtoken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Token is not valid' });
  });
});