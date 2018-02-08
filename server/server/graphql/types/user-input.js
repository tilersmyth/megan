import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
  } from 'graphql';
  
export default new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        first_name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        last_name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});