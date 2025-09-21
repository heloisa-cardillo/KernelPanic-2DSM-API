import { Router } from "express";
import { getVendas, getVendaById,teste } from "../Controllers/gestaoControllers";


const router = Router();

router.get("/teste",teste)

router.get("/",getVendas)

router.get("/:id",getVendaById)

export default router;
