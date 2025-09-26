import "reflect-metadata"; // Necessário para funcionar com decorators do TypeORM
import app from "./app";    // Importa a instância do Express configurada

const PORT = process.env.PORT || 5050; // Define a porta do servidor (env ou 5000)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // Mensagem que o servidor está rodando, mostrando a URL
});

// // Chamada da função para executar o teste
// testarClienteService();