import mongoose, {Schema} from 'mongoose';
import crypto from 'crypto';
mongoose.Promise = require('bluebird');

import config from '../../config/config';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  active: {
    type: Boolean,
    default: (config.confirm_mail ? false : true)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    return this.constructor.findOne({ email: value }).exec()
      .then(user => {
        if(user) {
          if(this.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');
  

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if(!this.isModified('password')) {
      return next();
    }
    
    if(!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if(saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if(encryptErr) {
          return next(encryptErr);
        }
        this.password = hashedPassword;
        return next();
      });
    });
  });


/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if(!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if(err) {
        return callback(err);
      }

      if(this.password === pwdGen) { 
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if(typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if(typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if(!byteSize) {
      byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if(err) {
        return callback(err);
      } else {
        return callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if(!password || !this.salt) {
      if(!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if(!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256')
        .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
      if(err) {
        return callback(err);
      } else {
        return callback(null, key.toString('base64'));
      }
    });
  }
};



/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
