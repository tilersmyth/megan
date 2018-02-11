import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import authType from '../../types/auth';

export default {
    type: authType,
    args: {
        token: {
            name: 'token',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root, params, { ctrl, config }) {
        return ctrl.auth.confirm(params, config);
    }
};
