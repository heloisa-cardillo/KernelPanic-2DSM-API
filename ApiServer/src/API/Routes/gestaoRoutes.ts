import { Router } from "express";
import { getVendas, getVendaById, UpdateVenda } from "../Controllers/gestaoControllers";

const router = Router();

router.get("/",getVendas)

router.get("/:id",getVendaById)

router.put("/:id", UpdateVenda)

module.exports = router;
