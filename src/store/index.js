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
    busy: false,
  },
  actions,
  mutations,
  getters,
});

setImmediate(() => store.dispatch('loadLocalStorage'));
window.onresize = () => store.dispatch('size', window.innerWidth);
store.dispatch('size', window.innerWidth);

export default store;
