import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/dashboard/Dashboard';

import games from './games';
import auth from './auth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
    ...games,
    ...auth,
  ],
});
