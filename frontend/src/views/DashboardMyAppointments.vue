<template>
    <div class="appointments-container">
        <h2>Minhas Consultas</h2>
        <div v-if="consultations.length === 0" class="empty">Você ainda não possui agendamentos.</div>

        <div class="grid">
            <div v-for="c in consultations" :key="c._id" class="appointment-card">
                <div class="info">
                    <p><strong>📅 Data:</strong> {{ c.date }}</p>
                    <p><strong>⏰ Hora:</strong> {{ c.time }}</p>

                    <div v-if="c.clima" class="weather-box">
                        <span class="clima-desc">🌤️ {{ c.clima.descricao }}</span>
                        <b class="temp">{{ Math.round(c.clima.temperatura) }}°C</b>
                        <div v-if="c.clima.chuva" class="chuva-alert">
                            ☔ <i>Leve o guarda-chuva!</i>
                        </div>
                    </div>
                </div>
                <button @click="deleteConsultation(c._id)" class="cancel-btn">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Swal from 'sweetalert2'; // Importando Swal novamente
import { useToast } from "vue-toastification";

const toast = useToast();
const consultations = ref([]);

const loadConsultations = async () => {
    try {
        const res = await api.get("/consultations");
        consultations.value = res.data;
    } catch (err) {
        toast.error("Erro ao carregar consultas.");
    }
};

const deleteConsultation = async (id) => {
    const result = await Swal.fire({
        title: 'Cancelar consulta?',
        text: "Deseja realmente cancelar este agendamento?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff6b6b',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Manter consulta',
        reverseButtons: true
    });

    if (result.isConfirmed) {
        try {
            await api.delete(`/consultations/${id}`);
            Swal.fire('Cancelada!', 'Consulta cancelada com sucesso.', 'success');
            loadConsultations();
        } catch {
            Swal.fire('Erro!', 'Não foi possível cancelar a consulta.', 'error');
        }
    }
};

onMounted(loadConsultations);
</script>

<style scoped>
.appointments-container {
    padding: 40px;
}

h2 {
    color: #1d3557;
    margin-bottom: 20px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.appointment-card {
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 5px solid #00b4d8;
}

.weather-box {
    margin-top: 15px;
    padding: 10px;
    background: #f0faff;
    border-radius: 10px;
    font-size: 0.9rem;
}

.clima-desc {
    text-transform: capitalize;
    color: #444;
}

.temp {
    color: #0077b6;
    margin-left: 8px;
}

.chuva-alert {
    color: #d63031;
    margin-top: 5px;
    font-weight: bold;
}

.cancel-btn {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 8px;
    margin-top: 15px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

.cancel-btn:hover {
    background: #ee5253;
}

.empty {
    color: #666;
    font-style: italic;
}
</style>