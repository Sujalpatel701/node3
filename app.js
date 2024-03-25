const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
console.log(port);
const bodyParser = require('body-parser');
const path = require('path');
const Try1 = require('./database/user');
const admin1 = require('./database/admin');
const mongoose = require('./database/connect');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const home = require('./routes/index');
const userroutes = require('./routes/userroutes');
const adminroutes = require('./routes/adminroutes');
const adminfunction = require('./routes/adminfunction');
const printfunction = require('./utils/printfunction');

app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');

app.use(session({secret: 'your_secret_key', saveUninitialized: false,}));

app.use('/', home);
app.use('/', userroutes);
app.use('/', adminroutes);
app.use('/', adminfunction);
app.use('/', printfunction);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});