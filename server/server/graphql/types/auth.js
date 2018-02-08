import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLList
  } from 'graphql';

import userType from './user';
  
export default new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        user: {
            type: new GraphQLNonNull(userType)
        }
    })
});