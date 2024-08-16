const express = require('express');
const passport = require('passport');
const router = express.Router();

// SSO Authentication Route
router.post('/login', passport.authenticate('saml', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/dashboard');
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Basic test route to ensure the auth route is working
router.get('/', (req, res) => {
  res.send('Auth route is working');
});

module.exports = router;