import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import authType from '../../types/auth';

export default {
  type: authType,
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, args, { ctrl, config, req }) {
    return ctrl.auth.login(args, config, req);
  }
};
