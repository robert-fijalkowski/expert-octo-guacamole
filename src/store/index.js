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
    menuVisible: false,
    access: null,
    profile: {},
    myProfile: {},
    notLoggedCause: null,
  },
  actions,
  mutations,
  getters,
});

setImmediate(() => store.dispatch('loadLocalStorage'));

export default store;
