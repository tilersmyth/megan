import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import User from '../models/user.model';

const localAuthenticate = (email, password, done) => {
    User.findOne({
        email: email.toLowerCase()
    }).exec()
        .then(user => {
            if(!user) {
                return done(null, false, {
                    message: 'This email is not registered.'
                });
            }
            user.authenticate(password, function(authError, authenticated) {
                if(authError) {
                    return done(authError);
                }
                if(!authenticated) {
                    return done(null, false, { message: 'This password is not correct.' });
                } else {
                    return done(null, user);
                }
            });
        })
        .catch(err => done(err));
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    return localAuthenticate(email, password, done);
}));

module.exports = passport;