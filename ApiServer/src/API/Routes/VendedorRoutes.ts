import { Router } from "express";
import { getVendedor } from "../Controllers/VendedorController";

const router = Router();

router.get("/", getVendedor)

module.exports = router;