import List from '@/components/games/List';
import GameDashboard from '@/components/games/GameDashboard';
import Create from '@/components/games/Create';

export default [
  { path: '/games', component: List, meta: { requiresAuth: true } },
  { path: '/games/join', component: List, meta: { requiresAuth: true } },
  { path: '/games/create', component: Create, meta: { requiresAuth: true, isPositive: 'isAdmin' } },
  {
    path: '/games/:id',
    component: GameDashboard,
    meta: { requiresAuth: true },
    props: true,
  },
];
