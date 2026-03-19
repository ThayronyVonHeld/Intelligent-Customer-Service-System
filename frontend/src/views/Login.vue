<template>
  <div class="container">

    <div class="left">
      <div class="overlay">
        <h1>Bem-vindo de volta</h1>
      </div>
    </div>

    <div class="right">
      <div class="form-box">
        <h2 class="brand">Dra. Maggessy Fisioterapia</h2>
        <h3>Login</h3>

        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Senha" />

        <button @click="login">Entrar</button>

        <p class="login-text">
          Não tem uma conta?
          <span class="login-link" @click="$emit('goRegister')">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref } from "vue";
import api from "../services/api";

const toast = useToast();
const email = ref("");
const password = ref("");


const emit = defineEmits(["goDashboard", "goAdmin", "goRegister"]);

const login = async () => {
  try {
    const response = await api.post("/users/login", {
      email: email.value,
      password: password.value
    });

    localStorage.setItem("token", response.data.token);

    // Decodificando token com segurança
    let payload = {};
    try {
      payload = JSON.parse(atob(response.data.token.split(".")[1]));
    } catch (err) {
      toast.error("Erro ao decodificar token");
      return;
    }

    toast.success("Login realizado!");

    // Redireciona pelo role
    if (payload.role === "secretario") {
      emit("goAdmin");
    } else {
      emit("goDashboard");
    }

  } catch (error) {
    toast.error(error.response?.data?.error || "Erro no login");
  }
};
</script>

<style scoped>

.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left {
  width: 60%;
  background: url("https://images.unsplash.com/photo-1580281657527-47b0c1a3b8d3") no-repeat center;
  background-size: cover;
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
}

.right {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.form-box {
  width: 70%;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #00b4d8;
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
}

.login-link {
  color: #00b4d8;
  cursor: pointer;
  font-weight: bold;
}
</style>