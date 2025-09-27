import express from "express";
import { criarCliente } from "../Controllers/cadastrarClientesControlers";
import { atribuirContato } from "../Controllers/atribuirContatoControler";
const router = express.Router()

router.post("/",criarCliente)
router.post("/contato",atribuirContato)

module.exports = router