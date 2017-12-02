import UsersList from '@/components/users/List';
import UserView from '@/components/users/UserView';

export default [
  { path: '/users', component: UsersList, meta: { requiresAuth: true } },
  {
    path: '/users/:id',
    component: UserView,
    meta: { requiresAuth: true },
    props: true,
  },
];
