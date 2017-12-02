// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Buefy from 'buefy';
import App from './App';
import store from './store/index';
import router from './router';
import Api from './plugins/api';

/* Initialize the plugin */
Vue.use(AsyncComputed);
Vue.use(Buefy, {
  defaultIconPack: 'fa',
});
Vue.config.productionTip = false;

Vue.use(Api);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
