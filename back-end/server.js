const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const cloudinary = require('cloudinary');

// cloudinary.config({
//     cloud_name: 'dupsdtrvy',
//     api_key: '943628789833962',
//     api_secret: 'xsn2ONslaeDRYZS3ojFuxG74fA0'
// });

dotenv.config({
    path: './config.env'
});

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

console.log(DB)

mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!'));

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})