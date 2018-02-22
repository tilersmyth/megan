import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

export default {
  type: GraphQLBoolean,
  args: {
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, { ctrl, config, req }) {
    return ctrl.auth.reset(params, config, req);
  }
};
