const express = require('express');
const router = express.Router();
const admin1 = require('../database/admin');
const Try1 = require('../database/user'); 

// Define requireAdmin function before using it
const requireAdmin = (req, res, next) => {
    if (!req.session.adminId) {
        return res.redirect('/admin'); // Redirect to login page
    }
    next();
};

router.get('/admin', (req, res) => {
    res.render('admin');
});

router.post('/adminresult', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const admin = await admin1.findOne({ name: username, pass: password });
        if (admin) {
            req.session.adminId = admin._id;
            req.session.adminName = admin.name;
            res.cookie('adminName', admin.name);
            res.cookie('adminId', admin._id);
            res.redirect('/adminpanel');
        } else {
            res.send('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error while querying database:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

router.get('/adminpanel', requireAdmin, async (req, res) => {
    try {
        const userData = await Try1.find({});
        if (!Array.isArray(userData)) {
            throw new Error('User data is not an array');
        }
        res.render('adminpanel', { userData });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        } else {
            res.clearCookie('adminName');
            res.clearCookie('adminId');
            res.redirect('/admin'); // Redirect to login page after logout
        }
    });
});

module.exports = router;
