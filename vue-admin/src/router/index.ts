import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardPage from '@/pages/DashboardPage.vue';
import UsersPage from '@/pages/users/Users.vue';
import UserCreatePage from '@/pages/users/UserCreate.vue';
import UserEditPage from '@/pages/users/UserEdit.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import BaseWrapper from '@/pages/BaseWrapper.vue';
import LoginPage from '@/pages/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  {
    path: '',
    component: BaseWrapper,
    children: [
      { path: '', component: DashboardPage },
      { path: '/users', component: UsersPage },
      { path: '/users/create', component: UserCreatePage },
      { path: '/users/:id/edit', component: UserEditPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
