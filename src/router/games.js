import List from '@/components/games/List';

export default [
  {
    path: '/games',
    component: List,
  },
  {
    path: '/games/:id',
    component: List,
  },
];
