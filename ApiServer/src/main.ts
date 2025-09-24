import "reflect-metadata";
import app from "./app"


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log("Servidor rodando em http://localhost:5000")
})

// src/main.ts (ou app.ts)

// import { AppDataSource } from "./DAL/ormconfig";
// import { ClienteService } from "./Business/Services/ClienteService"; // Ajuste o caminho conforme a sua estrutura

// async function testarClienteService() {
//   try {
//     // Inicializa a conexão com o banco de dados
//     if (!AppDataSource.isInitialized) {
//       await AppDataSource.initialize();
//       console.log("Conexão com o banco de dados inicializada.");
//     }
    
//     // Instancia o serviço de cliente
//     const clienteService = new ClienteService();
    
//     // 1. Crie um novo cliente de teste
//     console.log("Criando um novo cliente de teste...");
//     const novoCliente = await clienteService.criarCliente({
//       nome: "Fulano de Tal",
//       endereco: "Rua Exemplo, 123",
//       funcionario_ID: 1, // Substitua por um ID de funcionário válido
//       funil_ID: 1,       // Substitua por um ID de funil de vendas válido
//     });
//     console.log("✅ Cliente criado:", novoCliente);

//     // 2. Liste todos os clientes para verificar
//     console.log("Listando todos os clientes...");
//     const todosClientes = await clienteService.listarTodos();
//     console.log(`✅ Foram encontrados ${todosClientes.length} clientes:`);
//     console.log(todosClientes);

//   } catch (error) {
//     console.error("❌ Ocorreu um erro:", error);
//   } finally {
//     // Fecha a conexão com o banco de dados (opcional para scripts de teste)
//     if (AppDataSource.isInitialized) {
//       await AppDataSource.destroy();
//       console.log("Conexão com o banco de dados encerrada.");
//     }
//   }
// }

// // Chame a função de teste
// testarClienteService();