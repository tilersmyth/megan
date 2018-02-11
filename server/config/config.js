import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  DOMAIN: Joi.string().required()
    .description('Base domain for app'),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  CONFIRM_SECRET: Joi.string().required()
    .description('JWT Secret to confirm new account'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  MAIL_USER: Joi.string().required()
    .description('Mail auth: username'),
  MAIL_PASS: Joi.string().required()
    .description('Mail auth: password'),
  EMAIL_CONFIRMATION: Joi.boolean().required()
    .description('Require email confirmation for new accounts')  
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  domain: envVars.DOMAIN,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  secrets:{
    jwt: envVars.JWT_SECRET,
    confirm: envVars.CONFIRM_SECRET
  },
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  mail: {
    user: envVars.MAIL_USER,
    pass: envVars.MAIL_PASS
  },
  confirm_mail: envVars.EMAIL_CONFIRMATION
};

export default config;
