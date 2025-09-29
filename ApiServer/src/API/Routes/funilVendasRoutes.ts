import express from "express";
import { putFunilCliente, getClientes, postMoverCliente } from "../Controllers/funilVendasControllers";

const router = express.Router();

router.post("/moverCliente", postMoverCliente);

router.put("/", putFunilCliente);

router.get("/", getClientes);

module.exports = router;