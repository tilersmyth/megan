import passport from 'passport';
import { signToken, verifyToken } from '../auth/auth.service';

import User from '../models/user.model';
import mail from '../mail';

const login = async (params, config, req) => {
  if (req.user) {
    throw new Error('Already logged in');
  }

  const request = req;
  request.body.email = params.email;
  request.body.password = params.password;

  const auth = new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      const error = err || info;

      if (error) {
        reject(error);
      }

      if (!user) {
        reject(new Error('Something went wrong, please try again.'));
      }

      resolve(user);
    })(req);
  });

  return await auth
    .then((user) => {
      const token = signToken({ _id: user._id }, config.secrets.jwt, '1y');

      return { auth: true, user, token };
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const register = async (params, config) => {
  const newUser = params.data;

  return await new User(newUser).save()
    .then((user) => {
      // New account confirmation required
      if (!user.active) {
        const confirmToken = signToken({ _id: user._id }, config.secrets.confirm, '1h');

        mail.confirmAccount.sendMail(
          user.email,
          { name: user.firstName, link: `${config.domain}confirm/${confirmToken}` }
        );

        return { auth: false, user: null, token: null };
      }

      const token = signToken({ _id: user._id }, config.secrets.jwt, '1y');
      return { auth: true, user, token };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const confirm = async (params, config) => (
  verifyToken(params.token, config.secrets.confirm, (err, decoded) => {
    // Token expired or malformed
    if (err) {
      throw new Error(err);
    }

    return User.findOneAndUpdate({ _id: decoded._id }, { $set: { active: true } }, '-password').exec()
      .then((user) => {
        const token = signToken({ _id: user._id }, config.secrets.jwt, '1y');
        return { auth: true, user, token };
      })
      .catch((error) => {
        throw new Error(error);
      });
  })
);

const forgot = async (params, config) => (

  User.findOne({ email: params.email }).exec()
    .then((user) => {
      if (!user) {
        throw new Error('E-mail not associated with account.');
      }

      const confirmToken = signToken({ _id: user._id }, config.secrets.confirm, '1h');

      mail.forgotPassword.sendMail(
        user.email,
        { name: user.firstName, link: `${config.domain}reset-password/${confirmToken}` }
      );

      return true;
    })
    .catch((err) => {
      throw new Error(err);
    })
);

const reset = async (params, config, req) => {
  if (!req.user) {
    throw new Error('Not authorized');
  }

  return User.findById(req.user._id).exec()
    .then((result) => {
      if (!result) {
        throw new Error('Unable to find current user');
      }

      const user = result;
      user.password = params.password;

      return user.save()
        .then(() => (
          true
        ))
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default { login, register, confirm, forgot, reset };
