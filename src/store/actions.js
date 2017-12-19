import * as types from './mutation-types';
import { api } from '../plugins/api';

const isTokenValid = token => true;

const refreshProfile = ({ commit, state }) => {
  api(state)('GET', '/users/myprofile').then(profile => commit(types.SET_MY_PROFILE, profile));
};

const decodeToken = (token, { commit, state }) => {
  const [, payload] = token.split('.');
  const {
    access, meta, id, exp,
  } = JSON.parse(atob(payload));
  const now = Date.now() / 1000;
  if (exp < now) {
    commit(types.NOT_LOGGED_CAUSE, 'Token has expired!');
  } else {
    commit(types.NOT_LOGGED_CAUSE, null);
    commit(types.SET_ACCESS_LEVEL, access);
    commit(types.SET_USER_PROFILE, meta);
    commit(types.NEW_JWT_TOKEN, token);
    commit(types.SET_USER_ID, id);
    refreshProfile({ commit, state });
  }
};

export default {
  refreshProfile,
  login({ commit, state }, token) {
    window.localStorage.setItem('TOKEN', token);
    decodeToken(token, { commit, state });
  },
  hideMenu({ commit, state }) {
    if (state.menuVisible) { commit(types.HIDE_MENU); }
  },
  isLoading({ commit }) {
    commit(types.IS_LOADING);
  },
  loaded({ commit }) {
    commit(types.LOADED);
  },
  toggleMenu({ commit, state: { menuVisible } }) {
    if (menuVisible) {
      return commit(types.HIDE_MENU);
    }
    return commit(types.SHOW_MENU);
  },
  loadLocalStorage({ commit, state }) {
    const token = window.localStorage.getItem('TOKEN');
    if (token) {
      decodeToken(token, { commit, state });
    }
  },
  logout({ commit }) {
    window.localStorage.removeItem('TOKEN');
    commit(types.CLEAR_JWT_TOKEN);
  },
  size({ commit }, width) {
    commit(types.IS_MOBILE, width <= 768);
  },
  ...refreshProfile,
};
