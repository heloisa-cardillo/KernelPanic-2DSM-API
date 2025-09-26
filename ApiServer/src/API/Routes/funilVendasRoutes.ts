import express from "express";
import { putFunilCliente, getClientes, postMoverCliente } from "../Controllers/funilVendasControllers";

const router = express.Router();

// ===== Rota POST para mover cliente entre estágios do funil =====
router.post("/moverCliente", postMoverCliente);

// ===== Rota PUT para atualizar funil do cliente =====
router.put("/", putFunilCliente);

// ===== Rota GET para listar clientes =====
router.get("/", getClientes);

module.exports = router;