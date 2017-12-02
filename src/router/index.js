import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/dashboard/Dashboard';
import NotLogged from '@/components/auth/NotLogged';
import ClubsSearch from '@/components/clubs/Search';

import store from '../store';
import games from './games';
import auth from './auth';
import users from './users';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    { path: '/notLogged', component: NotLogged },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/clubs', component: ClubsSearch, meta: { requiresAuth: true } },
    ...games,
    ...auth,
    ...users,
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogged) {
      next({
        path: '/notLogged',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
