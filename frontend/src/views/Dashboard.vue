<template>
  <div class="dashboard">

    <h1>Minhas Consultas</h1>

    <div class="form">
      <input type="date" v-model="date" />
      <input type="time" v-model="time" />
      <button @click="createConsultation">Agendar</button>
    </div>

    <div class="list">
      <div v-for="c in consultations" :key="c._id" class="card">
        <p><strong>Data:</strong> {{ c.date }}</p>
        <p><strong>Hora:</strong> {{ c.time }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";

const toast = useToast();

const consultations = ref([]);
const date = ref("");
const time = ref("");

const loadConsultations = async () => {
  try {
    const res = await api.get("/consultations");
    consultations.value = res.data;
  } catch (err) {
    toast.error("Erro ao carregar consultas");
  }
};

const createConsultation = async () => {
  try {
    await api.post("/consultations", {
      date: date.value,
      time: time.value
    });

    toast.success("Consulta agendada!");

    loadConsultations();

  } catch (err) {
    toast.error(err.response?.data?.error || "Erro ao agendar");
  }
};

onMounted(loadConsultations);
</script>

<style scoped>
.dashboard {
  padding: 40px;
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
  min-height: 100vh;
}

.form {
  margin-bottom: 20px;
}

input {
  margin-right: 10px;
  padding: 10px;
}

button {
  padding: 10px;
  background: #00b4d8;
  color: white;
  border: none;
  border-radius: 8px;
}

.card {
  background: white;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
}
</style>