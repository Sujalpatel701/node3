const express = require('express');
const router = express.Router();
const Try1 = require('../database/user');

router.get('/adminname', async (req, res) => {
    try {
        const userDataname = await Try1.find({}, { name: 1, _id: 0 });
        if (!Array.isArray(userDataname)) {
            throw new Error('User data is not an array');
        }
        res.render('adminname', { userDataname });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');
    }
});

router.get('/adminphone', async (req, res) => {
    try {
        const userDataphone = await Try1.find({}, { phone: 1, _id: 0 });
        if (!Array.isArray(userDataphone)) {
            throw new Error('User data is not an array');
        }
        res.render('adminphone', { userDataphone });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');
    }
});

router.get('/adminemail', async (req, res) => {
    try {
        const userDataemail = await Try1.find({}, { email: 1, _id: 0 });
        if (!Array.isArray(userDataemail)) {
            throw new Error('User data is not an array');
        }
        res.render('adminemail', { userDataemail });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');
    }
});

module.exports = router;
