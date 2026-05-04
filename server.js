require("dotenv").config();

require("dotenv").config();
console.log("--- TESTE DE VARIÁVEIS ---");
console.log("Usuário:", process.env.DB_USER);
console.log("Senha:", process.env.DB_PASSWORD);
console.log("Banco:", process.env.DB_NAME);
console.log("--------------------------");


const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const pool = new Pool({
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_NAME),
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
});

// REGISTRO
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, hash]
  );

  res.send("Usuário criado");
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ESTA LINHA ABAIXO É A QUE ESTÁ FALTANDO NO SEU PRINT:
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rows.length === 0) {
    return res.status(401).send("Usuário não existe");
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).send("Senha incorreta");
  }

  res.send("Login OK");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});