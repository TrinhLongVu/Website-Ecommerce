const httpsServer = require('./app.payment')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
});

const PORT = process.env.PORTPAYMENT || 3001;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!'));


httpsServer.listen(PORT);