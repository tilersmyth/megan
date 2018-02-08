import {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';

import userType from '../../types/user';

export default {
    type: userType,
    args: {},
    resolve (root, params, { ctrl, config, user }) {
        return ctrl.user.me(user);
    }
};