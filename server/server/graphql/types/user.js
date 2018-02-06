import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
  } from 'graphql';
  
export default new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        createdAt: {
            type: GraphQLString
        }

    })
});