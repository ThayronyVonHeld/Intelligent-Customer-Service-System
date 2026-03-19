import express from "express";
import { getWeatherByDate } from "../services/weatherService.js";

const router = express.Router();

router.get("/:date", async (req, res) => {
  const { date } = req.params;
  
  const weather = await getWeatherByDate(date);

  if (!weather) {
    return res.status(404).json({ 
      error: "Previsão não encontrada ou data fora do alcance de 5 dias." 
    });
  }

  res.json(weather);
});

export default router;