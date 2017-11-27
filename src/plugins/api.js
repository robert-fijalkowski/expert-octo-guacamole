/* eslint-disable no-param-reassign */
import * as request from 'superagent';
import * as R from 'ramda';

export default {
  install(Vue) {
    const { API_URL } = process.env;
    Vue.prototype.$api = function api(method, endpoint, data) {
      const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const token = this.$store.state.token;
      let aRequest = request[method.toLowerCase()](`${API_URL}${path}`);
      if (token) {
        aRequest = aRequest.set('Auth-Token', token);
      }
      if (data) {
        aRequest.send(data);
      }
      return aRequest.then(R.prop('body'));
    };
  },
};
