import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

const login = async (params, config) => {
  
  const user = await User.findOne({ email: params.email });

  if (!user) {
    throw new Error('No user associated with specified email address');
  }

  const valid = await bcrypt.compare(params.password, user.password);
  if (!valid) {
    throw new Error('The password entered is not correct');
  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    config.jwtSecret,
    {
      expiresIn: '1y',
    },
  );

  return { user: user, token: token };

}

const register = async (params, config) => {

  const newUser = params.data;

  const existingUser = await User.findOne({ email: newUser.email });

  if (existingUser) {
    throw new Error('The specified email address is already in use');
  }

  newUser.password = await bcrypt.hash(newUser.password, 12);

  const user = await new User(newUser).save();

  if(!user){
    throw new Error('Error saving new user');
  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    config.jwtSecret,
    {
      expiresIn: '1y',
    },
  );

  return { user: user, token: token };

}

export default { login, register };
