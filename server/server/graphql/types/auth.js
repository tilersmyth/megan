import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLBoolean
  } from 'graphql';

import userType from './user';

export default new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    auth: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    token: {
      type: GraphQLString
    },
    user: {
      type: userType
    }
  })
});
