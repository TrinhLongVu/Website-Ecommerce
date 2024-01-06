const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const productRouter = require('./routes/product.routers.js')
const userRouter = require('./routes/user.routers.js')
const authentication = require('./routes/authentication.router.js')
const categoryRouter = require('./routes/category.router.js')
const cartRouter = require('./routes/cart.router.js')
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
app.use('/api/v1/cart', cartRouter);

const paymentRouter1 = require('./routes/payment1.router.js');
app.use('/api/v1/payment/user', paymentRouter1);

const paymentRouter = require('./routes/payment.router.js');
app.use('/api/v1/payment', paymentRouter);

module.exports = app;