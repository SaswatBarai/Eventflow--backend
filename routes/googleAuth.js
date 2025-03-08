import express from "express";
import passport from "passport";
import dotenv from "dotenv";
const router = express.Router();


// Login User
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/login-fail'
}));

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/profile',
        failureRedirect: '/auth/login-fail'
    })
);

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out' });
    });
});

// Get User Profile
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Not logged in' });
    res.json(req.user);
});

// Login Fail
router.get('/login-fail', (req, res) => {
    res.status(401).json({ message: 'Login failed' });
});

export default router;


