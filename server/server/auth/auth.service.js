import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

import config from '../../config/config';

const validateJwt = expressJwt({
  secret: config.secrets.jwt
});

/**
 * Authenticate GraphQL endpoint
 */
const graphAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next();
    return;
  }

  validateJwt(req, res, next);
};

/**
 * Return token signed by respective secret
 */
const signToken = (payload, secret, duration) => (
  jwt.sign(payload, secret, {
    expiresIn: duration
  })
);

/**
 * Verify signed token
 */
const verifyToken = (token, secret, done) => (
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return done(err);
    }

    return done(null, decoded);
  })
);

export default { graphAuth, signToken, verifyToken };
