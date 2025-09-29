import { Router } from "express";
import {  getVendaById, UpdateVenda } from "../Controllers/gestaoControllers";
import { getClientes } from "../Controllers/funilVendasControllers";

const router = Router();

router.get("/",getClientes)

router.get("/:id",getVendaById)

router.put("/:id", UpdateVenda)

module.exports = router;
