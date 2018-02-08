import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import authType from '../../types/auth';
import userInputType from '../../types/user-input';

export default {
    type: authType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(userInputType)
        }
    },
    resolve (root, params, { ctrl, config }) {
        return ctrl.auth.register(params, config);
    }
};
