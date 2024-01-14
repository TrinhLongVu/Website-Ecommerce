const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Payment = require('../models/payment.model')
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
});

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, {
            name: user.UserName,
            type: user.type
        })
    })

    passport.deserializeUser(async (user, done) => {
        try {
            console.log(user);
            if (user.type === 'local') {
                const userLogin = await User.findOne({ UserName: user.name });
                if (userLogin) {
                    return done(null, userLogin);
                }
                return done('invalid');
            } else {
                const userLogin = await User.findOne({ type: user.type });
                if (userLogin) {
                    return done(null, userLogin);
                }
                return done('invalid');
            }
        } catch (err) {
            return done(err);
        }
    });    


    // username and password get from body
    passport.use(new LocalStrategy(async (username, Password, done) => {
        console.log("Username : ", username);
        console.log("Password : ", Password);
        try {
            const user = await User.findOne({
                UserName: username.trim()
            });
            if (!user) {
                return done(null, false, {
                    message: 'Invalid username or password'
                }) 
            }
            const isPasswordValid = await bcrypt.compare(Password, user.Password);
            if (isPasswordValid) {
                return done(null, user);
            }
            return done(null, false, {
                message: 'Invalid username or password'
            });
        } catch (err) {
            return done(err)
        }
    }))
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: "http://localhost:8000/api/v1/user/account/gg/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("google.....")
            const user = await User.findOne({
                type: profile.id
            })
            if (user) {
                return done(null, user);
            }

            const newUser = new User({
                FullName: profile.displayName,
                type: profile.id,
                Image_Avatar: profile.photos[0].value
            });

            const create = await User.create(newUser);

            const response = await fetch("https://localhost:3001/api/v1/payment/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: create._id
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return done(null, create);
        }
    ))
}