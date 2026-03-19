<template>
  <div class="dashboard">

    <nav class="navbar">
      <h2>Dra. Maggessy</h2>
      <button @click="logout">Sair</button>
    </nav>

    <div class="header">
      <h1>Bem-vindo 👋</h1>
      <p>Gerencie suas consultas de forma simples e rápida</p>
    </div>

    
    <div class="grid">

      <div class="card">
  <h3>Agendar Consulta</h3>
  <input type="date" v-model="date" :min="todayDate" />
  
  <select v-model="time">
    <option value="" disabled selected>Selecione o horário</option>
    <option v-for="h in availableHours" :key="h" :value="h">
      {{ h }}
    </option>
  </select>

  <button @click="createConsultation" :disabled="!date || !time">
    Agendar
  </button>
</div>

      
      <div class="card">
        <h3>Minhas Consultas</h3>

        <div v-if="consultations.length === 0">
          Nenhuma consulta agendada
        </div>

<div v-for="c in consultations" :key="c._id" class="consultation">
  <div>
    <p><strong>📅</strong> {{ c.date }} - <strong>⏰</strong> {{ c.time }}</p>
    <p v-if="c.clima" style="font-size: 0.85rem; color: #444; margin-top: 5px; background: #fff; padding: 5px 10px; border-radius: 20px; display: inline-block;">
   <span style="text-transform: capitalize;">🌤️ {{ c.clima.descricao }}</span> 
   <b style="color: #0077b6; margin-left: 8px;">{{ Math.round(c.clima.temperatura) }}°C</b>
   <span v-if="c.clima.chuva" style="margin-left: 8px;"> ☔ <i>Leve guarda-chuva!</i></span>
</p>
  </div>
  <button class="cancel-btn" @click="deleteConsultation(c._id)">Cancelar</button>
</div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"; // Imports unificados
import api from "../services/api";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2';

const toast = useToast();

const consultations = ref([]);
const date = ref("");
const time = ref("");

// Define a data mínima como hoje no calendário
const todayDate = new Date().toISOString().split('T')[0];

const availableHours = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
  "5:00 PM", "6:00 PM", "7:00 PM"
];

const isSunday = (dateStr) => {
  if (!dateStr) return false;
  const [year, month, day] = dateStr.split("-");
  const d = new Date(year, month - 1, day);
  return d.getDay() === 0;
};

const loadConsultations = async () => {
  try {
    const res = await api.get("/consultations");
    consultations.value = res.data;
  } catch {
    toast.error("Erro ao carregar consultas");
  }
};

const createConsultation = async () => {
  try {
    if (!date.value || !time.value) {
      return toast.error("Preencha data e hora");
    }

    if (isSunday(date.value)) {
      return toast.error("Não atendemos aos domingos");
    }

    await api.post("/consultations", {
      date: date.value,
      time: time.value 
    });

    toast.success("Consulta agendada com sucesso!");
    
    // Limpar campos após sucesso
    date.value = "";
    time.value = "";
    
    await loadConsultations();
  } catch (err) {
    toast.error(err.response?.data?.error || "Erro ao agendar");
  }
};

const deleteConsultation = async (id) => {
  const result = await Swal.fire({
    title: 'Cancelar consulta?',
    text: "Deseja cancelar esta consulta?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, cancelar',
    cancelButtonText: 'Não, voltar',
    reverseButtons: true
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/consultations/${id}`);
      Swal.fire('Cancelada!', 'Consulta cancelada com sucesso.', 'success');
      loadConsultations();
    } catch {
      Swal.fire('Erro!', 'Erro ao cancelar consulta.', 'error');
    }
  }
};

const logout = () => {
  localStorage.removeItem("token");
  location.reload(); 
};

onMounted(loadConsultations);
</script>

<style scoped>


.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
  padding: 20px;
  font-family: Arial, sans-serif;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  padding: 15px 30px;
  border-radius: 10px;

  margin-bottom: 30px;
}

.navbar h2 {
  color: #0077b6;
}

.navbar button {
  width: auto; 
  background: #ff6b6b;
  border: none;
  padding: 8px 15px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 15px;

  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card h3 {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px; /* Aumentei um pouco o espaçamento */
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: white; /* Garante fundo branco no select */
  font-family: Arial, sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #00b4d8; /* Cor de destaque ao clicar */
}

button {
  width: 100%;
  padding: 10px;

  border: none;
  border-radius: 8px;

  background: linear-gradient(135deg, #00b4d8, #80ed99);
  color: white;
  font-weight: bold;

  cursor: pointer;
}

.consultation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #f1faff;
  padding: 12px;
  margin-top: 10px;
  border-radius: 10px;
}

.cancel-btn {
  background: #ff6b6b;
  border: none;
  padding: 6px 12px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
}

.cancel-btn:hover {
  background: #e63946;
}

</style>