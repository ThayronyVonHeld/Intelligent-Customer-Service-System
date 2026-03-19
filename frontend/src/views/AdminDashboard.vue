<template>
  <div class="dashboard">
    <nav class="navbar">
      <div class="nav-content">
        <h2>Painel da Clínica - Dra. Maggessy</h2>
        <button @click="handleLogout" class="logout-btn">Sair</button>
      </div>
    </nav>

    <div class="header">
      <h1>Consultas Agendadas</h1>
      <p>Total de agendamentos: <strong>{{ consultations.length }}</strong></p>
    </div>

    <div class="list">
      <div v-for="c in consultations" :key="c._id" class="card">
        <div class="user-info">
          <p><strong>👤 Paciente:</strong> {{ c.user?.name || 'N/A' }}</p>
          <p><strong>📧 Contato:</strong> {{ c.user?.email }}</p>
        </div>
        <hr />
        <div class="consultation-info">
          <p><strong>📅 Data:</strong> {{ c.date }}</p>
          <p><strong>⏰ Hora:</strong> {{ c.time }}</p>
        </div>

        <div v-if="c.clima" class="weather-badge">
           <span style="text-transform: capitalize;">🌤️ {{ c.clima.descricao }}</span> 
           <b>{{ Math.round(c.clima.temperatura) }}°C</b>
           <span v-if="c.clima.chuva"> ☔</span>
        </div>

        <button class="delete-btn" @click="deleteConsultation(c._id)">
          Cancelar Agendamento
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const toast = useToast();
const router = useRouter();
const consultations = ref([]);

const loadConsultations = async () => {
  try {
    const res = await api.get("/consultations/all");
    consultations.value = res.data;
  } catch (err) {
    toast.error("Acesso negado ou erro ao carregar");
  }
};

const deleteConsultation = async (id) => {
  const result = await Swal.fire({
    title: 'Confirmar cancelamento?',
    text: "Esta ação não pode ser desfeita.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff6b6b',
    confirmButtonText: 'Sim, cancelar'
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/consultations/${id}`);
      Swal.fire('Cancelada!', 'Consulta cancelada com sucesso.', 'success');
      loadConsultations();
    } catch {
      toast.error("Erro ao cancelar");
    }
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/"); // Volta para a Home usando o router
};

onMounted(loadConsultations);
</script>

<style scoped>
.dashboard {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
  padding: 20px;
}

.nav-content {
  width: 100%;
  display: flex;
  justify-content: space-between; /* Joga o botão para a direita ✅ */
  align-items: center;
  background: white;
  padding: 15px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.logout-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background: #ee5253;
  transform: scale(1.05);
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

hr {
  border: 0;
  border-top: 1px solid #eee;
  margin: 15px 0;
}

.weather-badge {
  background: #f0faff;
  padding: 10px;
  border-radius: 10px;
  margin: 15px 0;
  display: flex;
  justify-content: space-around;
  border: 1px solid #d1ecf1;
}

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}
</style>