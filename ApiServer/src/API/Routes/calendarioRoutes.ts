import express from "express"
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("Ta funfando")
})

router.post("/", (req, res)=>{
    const body = req.body
    res.send(body)
})

router.put("/", (req, res)=>{
    res.send("Ta funfando")
})

router.delete("/", (req, res)=>{
    res.send("Ta funfando")
})


module.exports = router