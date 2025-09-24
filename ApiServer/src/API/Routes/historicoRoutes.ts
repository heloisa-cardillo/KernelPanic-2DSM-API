import { Router } from "express";
import { getInteracoes, getInteracoesID, teste } from "../Controllers/historicoControllers";

const router = Router();

router.get("/teste", teste);
router.get("/", getInteracoes);
router.get("/:id", getInteracoesID);

export default router;
