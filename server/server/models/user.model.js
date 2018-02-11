import mongoose from 'mongoose';
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
  active: {
    type: Boolean,
    default: (config.confirm_mail ? false : true)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
