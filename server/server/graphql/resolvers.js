import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default {
  Query: {
    allUsers: (parent, args, { User }) => User.findAll(),
    me: (parent, args, { User, user }) => {
        if (user) {
          return User.findById(user._id);
        }

        return null;
    },
  },

  Mutation: {
    register: async (parent, args, { User, config }) => {
      
      const newUser = args;

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
          user: _.pick(user, ['_id', 'email']),
        },
        config.jwtSecret,
        {
          expiresIn: '1y',
        },
      );

      return token;
    },
    login: async (parent, { email, password }, { User, config }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error('No user associated with specified email address');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('The password entered is not correct');
      }

      const token = jwt.sign(
        {
          user: _.pick(user, ['_id', 'email']),
        },
        config.jwtSecret,
        {
          expiresIn: '1y',
        },
      );

      return token;
    },
  },
};