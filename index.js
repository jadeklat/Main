const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_strong_random_secret_here', // Replace with a secure secret
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/classes', require('./server/routes/classes')); // Assuming you have a classes route file

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));