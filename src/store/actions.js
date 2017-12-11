import * as types from './mutation-types';
import { api } from '../plugins/api';

const isTokenValid = token => true;

const refreshProfile = ({ commit, state }) => {
  api(state)('GET', '/users/myprofile').then(profile => commit(types.SET_MY_PROFILE, profile));
};
const decodeToken = (token, { commit, state }) => {
  const [, payload] = token.split('.');
  const { access, meta, id } = JSON.parse(atob(payload));
  commit(types.SET_ACCESS_LEVEL, access);
  commit(types.SET_USER_PROFILE, meta);
  commit(types.NEW_JWT_TOKEN, token);
  commit(types.SET_USER_ID, id);
  refreshProfile({ commit, state });
};

export default {
  login({ commit, state }, token) {
    window.localStorage.setItem('TOKEN', token);
    decodeToken(token, { commit, state });
  },
  hideMenu({ commit }) {
    commit(types.HIDE_MENU);
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
  ...refreshProfile,
};
