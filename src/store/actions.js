import * as types from './mutation-types';

const decodeToken = (token, { commit }) => {
  const [, payload] = token.split('.');
  const { access, meta } = JSON.parse(atob(payload));
  commit(types.SET_ACCESS_LEVEL, access);
  commit(types.SET_USER_PROFILE, meta);
};
export default {
  login({ commit }, token) {
    window.localStorage.setItem('TOKEN', token);
    commit(types.NEW_JWT_TOKEN, token);
    decodeToken(token);
  },
  loadLocalStorage({ commit }) {
    const token = window.localStorage.getItem('TOKEN');
    if (token) {
      decodeToken(token, { commit });
      commit(types.NEW_JWT_TOKEN, token);
    }
  },
};
