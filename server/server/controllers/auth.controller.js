import passport from 'passport';
import { signToken, verifyToken } from '../auth/auth.service';

import User from '../models/user.model';
import mail from '../mail';

const login = async (params, config, req) => {
  
  if(req.user){
    throw new Error('Already logged in');
  }

  req.body.email = params.email;
  req.body.password = params.password;

  const auth = new Promise(function(resolve, reject) {
    passport.authenticate('local', function(err, user, info) {

      const error = err || info;

      if(error) {
        reject(error)
      }

      if(!user) {
        reject(new Error('Something went wrong, please try again.'));
      }
      
      resolve(user);

    })(req);
  });

  return await auth
    .then(user => {

      const token = signToken({_id: user._id}, config.secrets.jwt, '1y');

      return { auth: true, user: user, token: token };

    })
    .catch(err => {
      throw new Error(err.message);
    });

}

const register = async (params, config, req) => {

  const newUser = params.data;

  return await new User(newUser).save()
    .then((user) => {

      // New account confirmation required
      if(!user.active){
        const confirmToken = signToken({_id: user._id}, config.secrets.confirm, '1h');

        mail.confirmAccount.sendMail(
          user.email, 
          {name: user.first_name, link: config.domain + 'confirm/' + confirmToken}
        );

        return { auth: false, user: null, token: null };
      }

      const token = signToken({_id: user._id}, config.secrets.jwt, '1y'); 
      return { auth: true, user: user, token: token };

    })
    .catch((err) => {
      throw new Error(err);
    });
}

const confirm = async (params, config) => {

  return verifyToken(params.token, config.secrets.confirm, function(err, decoded) {

    // Token expired or malformed
    if(err){
      throw new Error(err);
    }

    return User.findOneAndUpdate({_id: decoded._id}, {$set:{active: true}}, '-password').exec()
      .then((user) => {

        const token = signToken({_id: user._id}, config.secrets.jwt, '1y');
        return { auth: true, user: user, token: token };

      })
      .catch((err) => {
        throw new Error(err);
      });

  });

}

export default { login, register, confirm };
