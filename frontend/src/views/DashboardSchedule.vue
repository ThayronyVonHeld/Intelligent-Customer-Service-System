<template>
    <div class="schedule-container">
        <div class="card">
            <h3>📅 Agendar Nova Consulta</h3>
            <p>Preencha os detalhes para marcar seu atendimento.</p>

            <label class="input-label">Tratamento Desejado:</label>
            <select v-model="service">
                <option value="" disabled selected>Escolha o serviço</option>
                <option value="Fisioterapia">Fisioterapia</option>
                <option value="RPG">RPG (Reeducação Postural)</option>
                <option value="Pilates">Pilates</option>
                <option value="Acupuntura">Acupuntura</option>
            </select>

            <label class="input-label">Data e Horário:</label>
            <div class="datetime-grid">
                <input type="date" v-model="date" :min="todayDate" />
                <select v-model="time">
                    <option value="" disabled selected>Horário</option>
                    <option v-for="h in availableHours" :key="h" :value="h">{{ h }}</option>
                </select>
            </div>

            <label class="input-label">Observações (Opcional):</label>
            <textarea v-model="observations"
                placeholder="Conte-nos brevemente o motivo da consulta ou alguma dor específica..." rows="3"></textarea>

            <button @click="createConsultation" :disabled="!date || !time || !service">
                Confirmar Agendamento
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2';

const toast = useToast();
const date = ref("");
const time = ref("");
const service = ref("");
const observations = ref("");
const todayDate = new Date().toISOString().split('T')[0];

const availableHours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const isSunday = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    const d = new Date(year, month - 1, day);
    return d.getDay() === 0;
};

const createConsultation = async () => {
    try {
    if (isSunday(date.value)) {
      return Swal.fire({
        title: 'Ops!',
        text: 'Não atendemos aos domingos. Por favor, escolha outro dia.',
        icon: 'info',
        confirmButtonColor: '#00b4d8'
      });
    }

    await api.post("/consultations", { 
      date: date.value, 
      time: time.value,
      service: service.value, 
      observations: observations.value 
    });

    await Swal.fire({
      title: 'Agendado!',
      text: `Sua consulta de ${service.value} foi marcada para o dia ${date.value} às ${time.value}.`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      timer: 5000, 
      timerProgressBar: true
    });
    
  
    date.value = ""; 
    time.value = "";
    service.value = "";
    observations.value = "";

  } catch (err) {
    Swal.fire({
      title: 'Erro ao agendar',
      text: err.response?.data?.error || 'Não foi possível completar seu agendamento. Tente novamente.',
      icon: 'error',
      confirmButtonColor: '#ff6b6b'
    });
  }
};
</script>

<style scoped>
.schedule-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.card {
  background: white;
  padding: 35px; 
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 480px;
  border: 1px solid #f0f0f0;
}

h3 {
  color: #0077b6;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 8px;
}

.card p {
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 25px;
}

.input-label {
  display: block;
  margin-top: 18px;
  font-weight: 600;
  color: #444;
  font-size: 0.85rem;
}

.datetime-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 15px;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 15px;
  margin-top: 8px;
  border-radius: 12px; 
  border: 1.5px solid #eee;
  background: #fafafa;
  outline: none;
  font-family: inherit;
  transition: all 0.3s ease;
}

textarea {
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #00b4d8;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 180, 216, 0.1);
}

button {
  display: block;
  width: auto; 
  min-width: 200px;
  margin: 30px auto 0 auto; 
  background: #00b4d8;
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 50px; 
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 180, 216, 0.2);
}

button:disabled {
  background: #ddd;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

button:hover:not(:disabled) {
  background: #0096b1;
  transform: translateY(-3px);
  box-shadow: 0 15px 25px rgba(0, 180, 216, 0.3);
}


@media (max-width: 480px) {
  .datetime-grid {
    grid-template-columns: 1fr;
  }
  button {
    width: 100%;
  }
}
</style>