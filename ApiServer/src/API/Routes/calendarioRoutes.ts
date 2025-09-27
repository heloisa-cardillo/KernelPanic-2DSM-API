import express from "express"
import { getLembrete, postLembrete } from "../Controllers/calendarioControllers"

const router = express.Router()

router.get("/", getLembrete)

router.post("/", postLembrete)


module.exports = router