import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/DashboardHome.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
 {
  path: '/dashboard',
  component: () => import('../views/DashboardLayout.vue'),
  meta: { requiresAuth: true },
  children: [
    { 
      path: '', // Rota padrão (Home)
      name: 'DashboardHome', 
      component: () => import('../views/DashboardHome.vue') 
    },
    { 
      path: 'agendar', 
      name: 'DashboardSchedule', 
      component: () => import('../views/DashboardSchedule.vue') 
    },
    { 
      path: 'consultas', 
      name: 'DashboardMyAppointments', 
      component: () => import('../views/DashboardMyAppointments.vue') 
    }
  ]
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