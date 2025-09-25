import { Router } from "express";
import { postEvento } from "../Controllers/eventoEmailController";

const router = Router();

router.post("/", postEvento);

export default router;