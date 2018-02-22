import userType from '../../types/user';

export default {
  type: userType,
  args: {},
  resolve(root, params, { ctrl, user }) {
    return ctrl.user.me(user);
  }
};
