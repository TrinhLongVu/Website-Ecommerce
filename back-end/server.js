const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const https = require('https');
const fs = require('fs');

// const privateKey = fs.readFileSync('./openssl/key.pem', 'utf8');
// const certificate = fs.readFileSync('./openssl/cert.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
dotenv.config({
    path: './config.env'
});

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

console.log('DB:', DB)

mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!'));


// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(PORT);
       
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})