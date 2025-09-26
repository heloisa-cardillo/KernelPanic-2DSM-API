import { Router } from "express";
import { postEvento , getEventos} from "../Controllers/eventoEmailController";

const router = Router();

<<<<<<< HEAD
// ===== Rota POST para criação de evento =====
router.post("/", postEvento);
=======
router.post("/lembrete", postEvento);

router.get("/", getEventos)
>>>>>>> 0200f270d4f9cdbf3bcfecfea1ab414d9b3ebfe6

module.exports = router;