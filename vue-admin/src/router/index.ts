import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardPage from '@/pages/DashboardPage.vue';
import UsersPage from '@/pages/UsersPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import BaseWrapper from '@/pages/BaseWrapper.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage },
  {
    path: '',
    component: BaseWrapper,
    children: [
      { path: '', component: DashboardPage },
      { path: '/users', component: UsersPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
