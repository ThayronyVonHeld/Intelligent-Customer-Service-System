import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

connectDB();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));