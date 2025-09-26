import express from "express";
import { criarCliente } from "../Controllers/cadastrarClientesControlers";

const router = express.Router();

// ===== Rota POST para criar novo cliente =====
router.post("/", criarCliente);

module.exports = router;