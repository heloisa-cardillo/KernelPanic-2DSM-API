import { Router } from "express";
import { getInteracoes, getInteracoesID, teste, getMovimentacoes } from "../Controllers/historicoControllers";

const router = Router();

router.get("/teste", teste);
router.get("/movimentacoes", getMovimentacoes)
router.get("/", getInteracoes);
router.get("/:id", getInteracoesID);

module.exports = router;
