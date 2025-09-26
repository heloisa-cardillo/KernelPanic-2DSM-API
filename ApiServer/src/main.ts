import "reflect-metadata"; // Necessário para funcionar com decorators do TypeORM
import app from "./app";    // Importa a instância do Express configurada

const PORT = process.env.PORT || 5000; // Define a porta do servidor (env ou 5000)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // Mensagem que o servidor está rodando, mostrando a URL
});

<<<<<<< HEAD
// // Chamada da função para executar o teste
// testarClienteService();
=======
app.listen(PORT, ()=>{
  console.log("Servidor rodando em http://localhost:5000")
})




>>>>>>> 0200f270d4f9cdbf3bcfecfea1ab414d9b3ebfe6
