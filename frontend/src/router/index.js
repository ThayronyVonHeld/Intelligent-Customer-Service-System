import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/admin', 
    component: AdminDashboard, 
    meta: { requiresAuth: true, requiresAdmin: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardião de Rotas: Protege as páginas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Se a rota exige login e não tem token
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;