
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/contact')


router.post('/submit-form', async (req, res) => {
  try {
    const { name, email, mobile, subject, text } = req.body;
    const newContact = new Contact({ name, email, mobile, subject, text });
    await newContact.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
