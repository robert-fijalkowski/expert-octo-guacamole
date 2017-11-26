import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    loggedIn: false,
    access: null,
    profile: {},
  },
  actions,
  mutations,
  getters,
});

setTimeout(() => {
  store.dispatch('loadLocalStorage');
}, 750);

export default store;
