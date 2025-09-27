import express from "express";
import { criarCliente } from "../Controllers/cadastrarClientesControlers";
<<<<<<< HEAD
import { atribuirContato } from "../Controllers/atribuirContatoControler";
const router = express.Router()

router.post("/",criarCliente)
router.post("/contato",atribuirContato)
=======

const router = express.Router();
>>>>>>> parent of 936c2c9 (Revert "Merge branch 'desenvolvimento' into feat/addContatoAoCriarCliente")

// ===== Rota POST para criar novo cliente =====
router.post("/", criarCliente);

module.exports = router;