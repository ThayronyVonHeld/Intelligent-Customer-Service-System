<template>
  <Home v-if="page === 'home'" @goRegister="page = 'register'" />
  <Register v-if="page === 'register'" />
</template>

<script setup>
import { ref } from "vue";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";

const page = ref("home");
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 🎨 Degradê */
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
}
</style>