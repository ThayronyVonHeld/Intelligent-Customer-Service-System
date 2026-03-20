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
            return toast.error("Não atendemos aos domingos.");
        }

        await api.post("/consultations", {
            date: date.value,
            time: time.value,
            service: service.value,     
            observations: observations.value 
        });

        toast.success("Consulta de " + service.value + " agendada!");

        date.value = "";
        time.value = "";
        service.value = "";
        observations.value = "";
    } catch (err) {
        toast.error(err.response?.data?.error || "Erro ao agendar");
    }
};
</script>

<style scoped>
.schedule-container {
    display: flex;
    justify-content: center;
    padding: 40px;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
}

.input-label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
    color: #1d3557;
    font-size: 0.9rem;
}

.datetime-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 10px;
}

input,
select,
textarea {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 8px;
    border: 1px solid #ddd;
    outline: none;
    font-family: inherit;
}

textarea {
    resize: none;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #00b4d8;
}

button {
    width: 100%;
    background: #00b4d8;
    color: white;
    border: none;
    padding: 15px;
    margin-top: 25px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background: #0096b1;
    transform: translateY(-2px);
}
</style>