import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

export default {
    type: GraphQLBoolean,
    args: {
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root, params, { ctrl, config }) {
        return ctrl.auth.forgot(params, config);
    }
};
