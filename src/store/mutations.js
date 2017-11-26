/* eslint-disable no-param-reassign */
import * as types from './mutation-types';

export default {
  [types.NEW_JWT_TOKEN](state, jwtToken) {
    state.token = jwtToken;
    state.loggedIn = true;
  },
  [types.CLEAR_JWT_TOKEN](state) {
    state.token = null;
    state.loggedIn = false;
    state.access = null;
    state.profile = null;
  },
  [types.SET_ACCESS_LEVEL](state, access) {
    state.access = access;
  },
  [types.SET_USER_PROFILE](state, profile) {
    state.profile = profile;
  },
};
