<template>
  <div class="layout-container">
    <nav class="navbar">
      <div class="logo">Dra. Maggessy</div>
      
      <div class="nav-links">
        <router-link to="/dashboard" exact-active-class="active">Home</router-link>
        <router-link to="/dashboard/agendar" active-class="active">Agendar</router-link>
        <router-link to="/dashboard/consultas" active-class="active">Consultas</router-link>
      </div>

      <button @click="handleLogout" class="logout-btn">Sair</button>
    </nav>

    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 50px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  font-weight: bold;
  padding: 5px 10px;
  transition: 0.3s;
}

.nav-links a.active {
  color: #00b4d8;
  border-bottom: 2px solid #00b4d8;
}

.logout-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>