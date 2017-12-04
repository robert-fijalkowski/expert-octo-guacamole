import List from '@/components/games/List';

export default [
  { path: '/games', component: List, meta: { requiresAuth: true } },
  {
    path: '/games/:id',
    component: List,
    meta: { requiresAuth: true },
    props: true,
  },
];
