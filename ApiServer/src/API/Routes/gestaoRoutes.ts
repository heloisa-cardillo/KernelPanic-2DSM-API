import { Router } from "express";
import { getVendas, getVendaById,teste, UpdateVenda } from "../Controllers/gestaoControllers";


const router = Router();

router.get("/teste",teste)

router.get("/",getVendas)

router.get("/:id",getVendaById)

router.put("/:id", UpdateVenda)

export default router;
