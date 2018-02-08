import expressJwt from 'express-jwt';
import config from '../../config/config';

const validateJwt = expressJwt({
    secret: config.jwtSecret
});

/**
 * Authenticate GraphQL endpoint
 */
const graphAuth = async (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        req.user = null;
        next();
        return;
    }

    validateJwt(req, res, next);
  
}

export default { graphAuth };