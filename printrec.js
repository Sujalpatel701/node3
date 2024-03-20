const fs = require('fs');
const PDFDocument = require('pdfkit');

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF output to a file
const outputStream = fs.createWriteStream('receipt.pdf');
doc.pipe(outputStream);

// Add content to the PDF
doc.fontSize(20).text('Receipt', { align: 'center' });
doc.moveDown();
doc.fontSize(12).text('Date: ' + new Date().toDateString());
doc.moveDown();
doc.text('Items:');
doc.moveDown();
doc.text('- Item 1: $10');
doc.text('- Item 2: $20');
doc.moveDown();
doc.text('Total: $30');

// Finalize the PDF and close the stream
doc.end();
outputStream.on('finish', () => {
    console.log('Receipt generated successfully!');
});
