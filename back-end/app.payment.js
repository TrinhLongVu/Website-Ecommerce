const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload')
const vnpayRouter = require('./routes/vnpay.router.js');
const mypayment = require('./routes/handle.payment.router.js');
const passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const p = require('./modules/passpost.js')
const fs = require('fs');

const privateKey = fs.readFileSync('./openssl/key.pem', 'utf8');
const certificate = fs.readFileSync('./openssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const https = require('https');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dupsdtrvy',
    api_key: '943628789833962',
    api_secret: 'xsn2ONslaeDRYZS3ojFuxG74fA0'
});

app.use(fileUpload({
    useTempFiles : true,
    limits: {fileSize: 50 * 2024 * 1024}
}));

app.use(cookieParser())
app.use(session({
    secret: "myscret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
}))

app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
// config middleware using req.body
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// handle
p(passport)

app.use('/api/v1/payment', mypayment);
app.use('/api/v1/vnpay', vnpayRouter);

const httpsServer = https.createServer(credentials, app);   
module.exports = httpsServer;