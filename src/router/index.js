import { getAuthToken, getVerifyAccount } from "../services/authService";
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';

// Import các views
// import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/Auth/Login.vue';
import VerifyLoginPage from '@/views/Auth/VerifyLogin.vue';
import TransactionHistory from '@/views/Transaction/TransactionHistory.vue';
import MerchantInfo from '@/views/Merchant/MerchantInfo.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'transaction-history',
        name: 'TransactionHistory',
        component: TransactionHistory
      },
      {
        path: 'merchant-info',
        name: 'MerchantInfo',
        component: MerchantInfo
      }
    ]
  },
  {
    path: '/login',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginPage
      },
      {
        path: '/verify-login',
        name: 'VerifyLogin',
        component: VerifyLoginPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/verify-login']; // Các trang không cần xác thực
  const authRequired = !publicPages.includes(to.path);
  const userToken = getAuthToken()
  const isVerified = getVerifyAccount()
  if (authRequired && !userToken && isVerified !== true) {
    return next('/login');
  }

  next();
});


export default router;
