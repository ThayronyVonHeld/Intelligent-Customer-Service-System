import express from "express";
import Consultation from "../models/Consultation.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { getWeatherByDate } from "../services/weatherService.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ error: "Data e horário são obrigatórios" });
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return res.status(400).json({ error: "Não é possível agendar para uma data passada" });
    }

    const existingConsultation = await Consultation.findOne({ date, time });
    if (existingConsultation) {
      return res.status(400).json({ error: "Este horário já está ocupado" });
    }

    const climaNoDia = await getWeatherByDate(date);

    const consultation = new Consultation({
      user: req.user.id,
      date,
      time,
      climaInfo: climaNoDia 
    });

    await consultation.save();
    res.status(201).json(consultation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const consultations = await Consultation.find({ user: req.user.id });

    const result = await Promise.all(
      consultations.map(async (c) => {
        const clima = await getWeatherByDate(c.date);

        return {
          ...c.toObject(),
          clima
        };
      })
    );

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["secretario"]),
  async (req, res) => {
    try {
      const consultations = await Consultation
        .find()
        .populate("user", "name email")
        .sort({ date: 1, time: 1 });

      const result = await Promise.all(
        consultations.map(async (c) => {
          const clima = await getWeatherByDate(c.date);

          return {
            ...c.toObject(),
            clima
          };
        })
      );

      res.json(result);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({ error: "Consulta não encontrada" });
    }

    if (consultation.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Não autorizado" });
    }

    await consultation.deleteOne();

    res.json({ message: "Consulta cancelada com sucesso" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;