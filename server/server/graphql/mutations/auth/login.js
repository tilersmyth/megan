import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import userType from '../../types/user';

export default {
    type: GraphQLString,
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
    resolve (root, params, { ctrl, config }) {
        return ctrl.auth.login(params, config);
    }
};
