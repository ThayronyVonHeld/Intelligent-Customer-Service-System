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
        <div class="service-badge">{{ c.service || 'Geral' }}</div>

        <div class="user-info">
          <p><strong>👤 Paciente:</strong> {{ c.user?.name || 'N/A' }}</p>
          <p><strong>📧 Contato:</strong> {{ c.user?.email }}</p>
        </div>

        <hr />

        <div class="consultation-info">
          <p><strong>📅 Data:</strong> {{ formatarDataBR(c.date) }}</p>
  <p><strong>⏰ Hora:</strong> {{ formatarHorario(c.time) }}</p>
        </div>

        <div v-if="c.observations" class="obs-box">
          <strong>📝 Observações:</strong>
          <p>{{ c.observations }}</p>
        </div>

        <div v-if="c.clima" class="weather-badge">
           <span style="text-transform: capitalize;">🌤️ {{ c.clima.descricao }}</span> 
           <b>{{ Math.round(c.clima.temperatura) }}°C</b>
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

const formatarHorario = (horario) => {
  if (!horario) return "N/A";
  
  let cleanTime = horario.toUpperCase().replace("AM", "").replace("PM", "").trim();
  
  if (cleanTime.length === 4 && cleanTime.includes(":")) {
    cleanTime = "0" + cleanTime;
  }
  
  return cleanTime;
};

const formatarDataBR = (dataISO) => {
  if (!dataISO) return "N/A";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
};

const loadConsultations = async () => {
  try {
    const res = await api.get("/consultations/all");
    
    consultations.value = res.data.sort((a, b) => {
      
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.time.localeCompare(b.time);
    });
    
  } catch (err) {
    toast.error("Erro ao carregar");
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
  router.push("/"); 
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
  justify-content: space-between; 
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

.service-badge {
  align-self: flex-start;
  background: #e0f7fa;
  color: #0077b6;
  padding: 5px 15px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-transform: uppercase;
  border: 1px solid #b2ebf2;
}

.obs-box {
  margin-top: 15px;
  padding: 10px;
  background: #fdfdfd;
  border-left: 3px solid #00b4d8;
  border-radius: 4px;
  font-size: 0.85rem;
}

.obs-box strong {
  display: block;
  color: #1d3557;
  margin-bottom: 4px;
}

.obs-box p {
  color: #666;
  font-style: italic;
  line-height: 1.4;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

hr { border: 0; border-top: 1px solid #eee; margin: 15px 0; }

.delete-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;
  font-weight: bold;
}
</style>