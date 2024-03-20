const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const Try1 = require('./database/user');
const admin1 = require('./database/admin');
const mongoose = require('./database/connect');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/user', (req, res) => {
    res.render('user');
});

app.post('/submit', async (req, res) => {
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

app.get('/admin', (req, res) => {
    res.render('admin');
});


app.post('/adminresult', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const admin = await admin1.findOne({ name: username, pass: password });
        if (admin) {
            res.redirect('/adminpanel');
        } else {
            res.send('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error while querying database:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});


app.get('/adminname',async (req, res) => {
    try{
        const userDataname = await Try1.find({},{name:1,_id:0});
        console.log(userDataname);
        if (!Array.isArray(userDataname)) {
            throw new Error('User data is not an array');
        }
        res.render('adminname', { userDataname });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');

    }
});

app.get('/adminphone',async (req, res) => {
    try{
        const userDataphone = await Try1.find({},{phone:1,_id:0});
        console.log(userDataphone);
        if (!Array.isArray(userDataphone)) {
            throw new Error('User data is not an array');
        }
        res.render('adminphone', { userDataphone });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');

    }
}
);

app.get('/adminemail',async (req, res) => {
    try{
        const userDataemail = await Try1.find({},{email:1,_id:0});
        console.log(userDataemail);
        if (!Array.isArray(userDataemail)) {
            throw new Error('User data is not an array');
        }
        res.render('adminemail', { userDataemail });
    } catch (error) {
        console.error('Error rendering admin panel:', error);
        res.status(500).send('An error occurred while rendering the admin panel.');

    }
}
);


app.get('/adminpanel', async (req, res) => {
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

app.post('/generateReceipt', async (req, res) => {
    try {
        const users = await Try1.find({}, 'phone');
        const userPhoneNumbers = users.map(user => user.phone);
        const doc = new PDFDocument();
        // Generate a unique file name using UUID
        const fileName = "phone"+ uuidv4() + '.pdf';
        const filePath = path.join(__dirname, 'prints', fileName); // Adjust the directory path as needed

        // Pipe the PDF output to a writable stream
        const outputStream = fs.createWriteStream(filePath);
        doc.pipe(outputStream);

        doc.fontSize(20).text('Receipt', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Date: ' + new Date().toDateString());
        doc.moveDown();
        doc.text('User Phone Numbers:');
        doc.moveDown();
        userPhoneNumbers.forEach(phone => {
            doc.text('- ' + phone);
        });
        doc.end();
        res.status(200).send('Receipt generated and saved successfully!');
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt');
    }
});


app.post('/generateReceiptname', async (req, res) => {
    try {
        const users = await Try1.find({}, 'name');
        const userPhoneNumbers = users.map(user => user.name);
        const doc = new PDFDocument();
        // Generate a unique file name using UUID
        const fileName = "name"+ uuidv4() + '.pdf';
        const filePath = path.join(__dirname, 'prints', fileName); // Adjust the directory path as needed

        // Pipe the PDF output to a writable stream
        const outputStream = fs.createWriteStream(filePath);
        doc.pipe(outputStream);

        doc.fontSize(20).text('Receipt', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Date: ' + new Date().toDateString());
        doc.moveDown();
        doc.text('User Phone Numbers:');
        doc.moveDown();
        userPhoneNumbers.forEach(phone => {
            doc.text('- ' + phone);
        });
        doc.end();
        res.status(200).send('Receipt generated and saved successfully!');
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt');
    }
});

app.post('/generateReceiptemail', async (req, res) => {
    try {
        const users = await Try1.find({}, 'email');
        const userPhoneNumbers = users.map(user => user.email);
        const doc = new PDFDocument();
        // Generate a unique file name using UUID
        const fileName = "email"+ uuidv4() + '.pdf';
        const filePath = path.join(__dirname, 'prints', fileName); // Adjust the directory path as needed

        // Pipe the PDF output to a writable stream
        const outputStream = fs.createWriteStream(filePath);
        doc.pipe(outputStream);

        doc.fontSize(20).text('Receipt', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Date: ' + new Date().toDateString());
        doc.moveDown();
        doc.text('User Phone Numbers:');
        doc.moveDown();
        userPhoneNumbers.forEach(phone => {
            doc.text('- ' + phone);
        });
        doc.end();
        res.status(200).send('Receipt generated and saved successfully!');
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
