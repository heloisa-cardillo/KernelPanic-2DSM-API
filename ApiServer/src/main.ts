import app from "./app"
import "reflect-metadata";

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log("Servidor rodando em http://localhost:5000")
})

