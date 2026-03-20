import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  service: { type: String, required: true },
  observations: { type: String },
  clima: {
    temperatura: Number,
    descricao: String,
    chuva: Boolean,
  },
});

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
