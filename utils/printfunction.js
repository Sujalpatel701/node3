const express = require('express');
const router = express.Router();
const Try1 = require('../database/user');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PRINTS_DIR = path.join(__dirname, '..', 'prints');
fs.mkdirSync(PRINTS_DIR, { recursive: true });

router.post('/generateReceipt', async (req, res) => {
    try {
        const users = await Try1.find({}, 'phone');
        const userPhoneNumbers = users.map(user => user.phone);
        const fileName = `phone-${uuidv4()}.pdf`;
        const filePath = path.join(PRINTS_DIR, fileName);
        await generateReceipt(filePath, 'Phone Receipt', userPhoneNumbers);
        res.status(200).send('Receipt generated and saved successfully!');
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt');
    }
});

router.post('/generateReceiptname', async (req, res) => {
    try {
        const users = await Try1.find({}, 'name');
        const userNames = users.map(user => user.name);
        const fileName = `name-${uuidv4()}.pdf`;
        const filePath = path.join(PRINTS_DIR, fileName);
        await generateReceipt(filePath, 'Name Receipt', userNames);
        res.status(200).send('Receipt generated and saved successfully!');
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt');
    }
});

router.post('/generateReceiptemail', async (req, res) => {
    try {
        const users = await Try1.find({}, 'email');
        const userEmails = users.map(user => user.email);
        const fileName = `email-${uuidv4()}.pdf`;
        const filePath = path.join(PRINTS_DIR, fileName);
        await generateReceipt(filePath, 'Email Receipt', userEmails);
        res.status(200).send('Receipt generated and saved successfully!');
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt');
    }
});

async function generateReceipt(filePath, title, data) {
    const doc = new PDFDocument();
    const outputStream = fs.createWriteStream(filePath);
    doc.pipe(outputStream);

    doc.fontSize(20).text(title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text('Date: ' + new Date().toDateString());
    doc.moveDown();
    doc.text('User Data:');
    doc.moveDown();
    data.forEach(item => {
        doc.text('- ' + item);
    });
    doc.end();
}

module.exports = router;
