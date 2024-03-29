import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardPage from "@/pages/DashboardPage.vue";
import UsersPage from "@/pages/users/Users.vue";
import UserCreatePage from "@/pages/users/UserCreate.vue";
import UserEditPage from "@/pages/users/UserEdit.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import BaseWrapper from "@/pages/BaseWrapper.vue";
import LoginPage from "@/pages/LoginPage.vue";
import Roles from "@/pages/roles/Roles.vue";
import RoleCreate from "@/pages/roles/RoleCreate.vue";
import RoleEdit from "@/pages/roles/RoleEdit.vue";
import ProductsPage from "@/pages/products/Products.vue";
import ProductCreate from "@/pages/products/ProductCreate.vue";
import ProductEdit from "@/pages/products/ProductEdit.vue";
import OrdersPage from "@/pages/orders/Orders.vue";
import ProfilePage from "@/pages/Profile.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
  {
    path: "",
    component: BaseWrapper,
    children: [
      { path: "", component: DashboardPage },
      { path: "/profile", component: ProfilePage },
      { path: "/users", component: UsersPage },
      { path: "/users/create", component: UserCreatePage },
      { path: "/users/:id/edit", component: UserEditPage },
      { path: "/roles", component: Roles },
      { path: "/roles/create", component: RoleCreate },
      { path: "/roles/:id/edit", component: RoleEdit },
      { path: "/products", component: ProductsPage },
      { path: "/products/create", component: ProductCreate },
      { path: "/products/:id/edit", component: ProductEdit },
      { path: "/orders", component: OrdersPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
