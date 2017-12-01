/* eslint-disable no-param-reassign */
import * as request from 'superagent';
import * as R from 'ramda';

const { API_URL } = process.env;

export const api = (state) => {
  const { token } = state;

  return (method, endpoint, data) => {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let aRequest = request[method.toLowerCase()](`${API_URL}${path}`);
    if (token) {
      aRequest = aRequest.set('Auth-Token', token);
    }
    if (data) {
      aRequest.send(data);
    }
    return aRequest.then(R.prop('body'));
  };
};

export default {
  install(Vue) {
    Vue.prototype.$api = function apiCall(method, endpoint, data) {
      return api(this.$store.state)(method, endpoint, data);
    };
  },
};
