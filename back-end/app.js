const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const productRouter = require('./routes/productRouters.js')
const userRouter = require('./routes/userRouters.js')
const authentication = require('./routes/authentication.js')
const categoryRouter = require('./routes/categoryRouter.js')
const passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const p = require('./modules/passpost.js')

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
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization'],
}))
// config middleware using req.body
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// handle
p(passport)

app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/user', authentication);
app.use('/api/v1/category', categoryRouter);

module.exports = app;