import express from "express"
import { putFunilCliente, getClientes } from "../Controllers/funilVendasControllers"

const router = express.Router()


router.put("/", putFunilCliente)

router.get("/" , getClientes)

module.exports = router