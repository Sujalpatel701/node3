const express = require('express');
const router = express.Router();
const Try1 = require('../database/user');

router.get('/user', (req, res) => {
    res.render('user');
});

router.post('/submit', async (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const newData = new Try1({ name: name, phone: phone, email: email });
    try {
        await newData.save();
        console.log(`Data saved: Name: ${name}, Phone: ${phone}, Email: ${email}`);
        res.send(`Thank you, ${name}, for your submission!`);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;
