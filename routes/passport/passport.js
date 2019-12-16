const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const key = process.env.SECRET_KEY || 'defaultSecretKey'
const User = require('../models/User')

//! opts = options
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key

module.exports = function (passport) {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) return done(null, user)
                else return done(null, false)
            })
            .catch(error => console.log(error))
    }));

};
