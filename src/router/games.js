import List from '@/components/games/List';
import Dashboard from '@/components/games/Dashboard/Dashboard';
import Create from '@/components/games/Create';

export default [
  { path: '/games', component: List, meta: { requiresAuth: true } },
  { path: '/games/join', component: List, meta: { requiresAuth: true } },
  { path: '/create', component: Create, meta: { requiresAuth: true, isPositive: 'isAdmin' } },
  {
    path: '/games/:gameId',
    component: Dashboard,
    meta: { requiresAuth: true },
    props: true,
  },
];
