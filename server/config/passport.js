const SamlStrategy = require('passport-saml').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.use(new SamlStrategy({
  path: '/api/auth/login/callback',
  entryPoint: process.env.SAML_ENTRY_POINT,
  issuer: process.env.SAML_ISSUER
}, (profile, done) => {
  User.findOne({ email: profile.email }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      // Create new user if not exist
      const newUser = new User({
        email: profile.email,
        name: profile.name
      });
      newUser.save().then(user => done(null, user));
    } else {
      return done(null, user);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
