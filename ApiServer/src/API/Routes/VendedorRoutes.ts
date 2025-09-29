import { Router } from "express";
//import { getVendedor } from "../Controllers/VendedorController";
import { getInteracoes } from "../Controllers/historicoControllers";
const router = Router();

router.get("/", getInteracoes)

module.exports = router;