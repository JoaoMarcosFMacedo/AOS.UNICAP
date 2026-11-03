import "dotenv/config";
import cors from "cors";
import express from "express";
import { sequelize } from "./models/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota base de teste
app.get("/", (req, res) => {
  return res.send("API do Currículo Express conectada e executando!");
});

const port = process.env.PORT || 3000;

// Sincroniza o banco de dados NeonDB e inicia o servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado com sucesso no NeonDB!');
  app.listen(port, () => console.log(`Servidor iniciado na porta ${port}!`));
}).catch((error) => {
  console.error('Erro ao sincronizar o banco de dados:', error);
});