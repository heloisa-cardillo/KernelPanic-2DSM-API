import { Router } from "express";
import { GestaoController } from "../Controllers/gestaoControllers";

const router = Router();
const controller = new GestaoController();

router.get("/", (req, res) => controller.listarVendas(req, res));
router.get("/:id", (req, res) => controller.buscarVenda(req, res));

export default router;
