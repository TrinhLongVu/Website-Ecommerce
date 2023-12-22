const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt'); use in the future
const User = require('../models/userModel')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv')
dotenv.config({
    path: `${__dirname}\\..\\config.env`
});

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, {
            name: user.UserName,
            type: user.type
        })
    })

    passport.deserializeUser(async (user, done) => {
        console.log(user)
        if (user.type != 'local') {
            const userLogin = await User.findOne({
                type: user.type
            })
            return done(null, userLogin);
        }
        const userLogin = await User.findOne({
            UserName: user.UserName
        });
        if (userLogin) {
            return done(null, userLogin)
        }
        return done('invalid')
    })

    // username and password get from body
    passport.use(new LocalStrategy(async (username, Password, done) => {
        console.log("Username : ", username);
        console.log("Password : ", Password);
        try {
            const user = await User.findOne({
                UserName: username.trim()
            });
            const rs = user.Password == Password
            if (rs) {
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
            return done(null, create);
        }
    ))
}