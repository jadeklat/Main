const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Session = require('../models/Session');

// Create Class
router.post('/create', async (req, res) => {
  const newClass = new Class({
    name: req.body.name,
    teacher: req.user.id,
    students: req.body.students
  });
  try {
    const savedClass = await newClass.save();
    res.json(savedClass);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Generate PIN for Class
router.post('/:id/generate-pin', async (req, res) => {
  const sessionPin = Math.floor(10000 + Math.random() * 90000).toString();
  const newSession = new Session({
    classId: req.params.id,
    date: new Date(),
    pin: sessionPin
  });
  try {
    const savedSession = await newSession.save();
    res.json({ pin: sessionPin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
