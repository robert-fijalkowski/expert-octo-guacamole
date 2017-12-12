/* eslint-disable no-param-reassign */
import * as request from 'superagent';
import * as R from 'ramda';

const { API_URL } = process.env;
const fn = () => {};
export const api = (state, store) => (method, endpoint, data) => {
  const { token } = state;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let aRequest = request[method.toLowerCase()](`${API_URL}${path}`);
  if (token) {
    aRequest = aRequest.set('Auth-Token', token);
  }
  const [loadingOn = fn, loadingOff = fn] = [
    R.path(['_actions', 'isLoading', 0], store),
    R.path(['_actions', 'loaded', 0], store),
  ];
  let processed = false;
  const done = () => { processed = true; };
  setTimeout(() => {
    if (!processed) {
      loadingOn();
    }
  }, 175);

  if (data) {
    aRequest.send(data);
  }
  return aRequest
    .then(R.pipe(R.prop('body'), R.tap(done), R.tap(loadingOff)))
    .catch(R.pipe(R.tap(done), R.tap(loadingOff), (e) => { throw e; }));
};

export default {
  install(Vue) {
    Vue.prototype.$api = function apiCall(method, endpoint, data) {
      return api(this.$store.state, this.$store)(method, endpoint, data);
    };
  },
};
