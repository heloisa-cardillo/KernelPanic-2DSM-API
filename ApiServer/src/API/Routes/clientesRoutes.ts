import express from "express";
import { criarCliente } from "../Controllers/cadastrarClientesControlers";
const router = express.Router()

router.post("/",criarCliente)

module.exports = router