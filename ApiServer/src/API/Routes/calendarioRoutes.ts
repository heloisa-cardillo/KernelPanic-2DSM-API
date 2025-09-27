import express from "express";
import { getLembrete, postLembrete } from "../Controllers/calendarioControllers";

const router = express.Router();

// ===== Rota GET para buscar lembrete =====
router.get("/", getLembrete);

// ===== Rota POST para criar lembrete =====
router.post("/", postLembrete);

module.exports = router;