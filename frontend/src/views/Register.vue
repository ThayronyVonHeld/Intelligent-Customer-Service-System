<template>
  <div class="container">
    
    
    <div class="left">
      <div class="overlay">
        <h1>Seu bem-estar, nossa missão</h1>
      </div>
    </div>

    <div class="right">
      <div class="form-box">
        <h2 class="brand">Dra. Maggessy Fisioterapia</h2>
        <h3>Cadastro</h3>

        <input v-model="name" placeholder="Nome" />
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Senha" />

        <button @click="register">Cadastrar</button>

        <p class="login-text">
          Já tem uma conta?
          <span class="login-link">Faça login</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const name = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  try {
    await api.post("/users", {
      name: name.value,
      email: email.value,
      password: password.value
    });

    alert("Cadastro realizado!");
  } catch (error) {
    alert(error.response?.data?.error || "Erro ao cadastrar");
  }
};
</script>

<style scoped>

.container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}


.left {
  width: 60%;
  background: url("https://images.unsplash.com/photo-1580281657527-47b0c1a3b8d3") no-repeat center;
  background-size: cover;
  position: relative;
}


.overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,180,216,0.6), rgba(128,237,153,0.6));
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay h1 {
  color: white;
  font-size: 32px;
  text-align: center;
  width: 70%;
}


.right {
  width: 40%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}


.form-box {
  width: 70%;
}

.brand {
  color: #1d3557;
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 20px;
}


input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;

  border-radius: 8px;
  border: 1px solid #00b4d8;
}

input:focus {
  outline: none;
  border-color: #0077b6;
}


button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;

  background: #00b4d8;
  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0096c7;
}

.login-text {
  margin-top: 15px;
  font-size: 14px;
}

.login-link {
  color: #00b4d8;
  cursor: pointer;
  font-weight: bold;
}
</style>