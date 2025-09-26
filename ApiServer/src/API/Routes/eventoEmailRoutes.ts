import { Router } from "express";
import { postEvento } from "../Controllers/eventoEmailController";

const router = Router();

// ===== Rota POST para criação de evento =====
router.post("/", postEvento);

module.exports = router;