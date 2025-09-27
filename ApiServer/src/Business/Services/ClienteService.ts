import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Cliente } from "../../DAL/Models/Cliente";
import { ContatoCliente } from "../../DAL/Models/ContatoCliente";
import { Funcionario } from "../../DAL/Models/Funcionario";
import { FunilVendas } from "../../DAL/Models/FunilVendas";

export class ClienteService {
      private clienteRepo: Repository<Cliente>;
      private clienteContatoRepo: Repository<ContatoCliente>;

      constructor() {
          this.clienteRepo = AppDataSource.getRepository(Cliente);
          this.clienteContatoRepo = AppDataSource.getRepository(ContatoCliente)
      }



async listarTodos(): Promise<Cliente[]> {
  return this.clienteRepo.find({
    relations: [
      "funcionario",
      "funil",
      "contatos",
      "historico",
      "agendamentos",
      "interacoes",
      "vendas",
    ],
  });
}

  // ===== Busca cliente por ID com suas relações =====
async buscarPorID(id: number): Promise<Cliente | null> {
    return this.clienteRepo.findOne({
      where: { cliente_ID: id },
      relations: [
        "funcionario",
        "funil",
        "contatos",
        "historico",
        "agendamentos",
        "interacoes",
        "vendas",
      ],
    });
  }
async criarCliente(data: {
            nome: string;
            endereco: string;
            funcionario_ID: number;
            funil_ID: number;
            tipo_contato: string;//contato_clinte
            valor_contato: string;//tb 

        }): Promise<Cliente> {
            const funcionarioRepo = AppDataSource.getRepository(Funcionario);
            const funilRepo = AppDataSource.getRepository(FunilVendas);
            
            const funcionario = await funcionarioRepo.findOneBy({
                funcionario_ID: data.funcionario_ID,
            });
            if (!funcionario) throw new Error("Funcionario não encontrado!");
            const clienteSalvo = await this.clienteRepo.save(cliente);
            const novoClienteId = clienteSalvo.cliente_ID;
            // console.log("Cliente salvo com o ID:",novoClienteId)
            const clienteConect = await this.clienteRepo.findOneBy({
                cliente_ID: novoClienteId,
            });
            const cliente_contato = this.clienteContatoRepo.create({
                tipo_contato: data.tipo_contato,
                valor_contato: data.valor_contato,
                cliente:clienteConect!
            });
            this.clienteContatoRepo.save(cliente_contato)
            return this.clienteRepo.save(cliente);
        }
        async atribuirContato(data:{
            tipo_contato: string;//contato_clinte
            valor_contato: string;//tb 
            client_id: number;}): Promise<ContatoCliente> {
            
            // console.log("Cliente salvo com o ID:",novoClienteId)
            const clienteConect = await this.clienteRepo.findOneBy({
                cliente_ID: data.client_id,
            });
            const cliente_contato = this.clienteContatoRepo.create({
                tipo_contato: data.tipo_contato,
                valor_contato: data.valor_contato,
                cliente:clienteConect!
            });
            return this.clienteContatoRepo.save(cliente_contato);
        }

    return this.clienteRepo.save(cliente);
  }


  // ===== Atualiza o funil do cliente =====
  async editarFunilCliente(
    id_cliente: number,
    novo_funil_id: number
  ): Promise<Cliente> {
    const clienteRepo = AppDataSource.getRepository(Cliente);
    const funilRepository = AppDataSource.getRepository(FunilVendas);

    // ===== Busca cliente pelo ID =====
    const cliente = await clienteRepo.findOne({
      where: { cliente_ID: id_cliente },
    });
    if (!cliente)
      throw new Error(`Cliente com ID ${id_cliente} não encontrado.`);

    // ===== Busca funil pelo ID =====
    const funil = await funilRepository.findOne({
      where: { funil_ID: novo_funil_id },
    });
    if (!funil)
      throw new Error(`Funil com ID ${novo_funil_id} não encontrado`);

    // ===== Atualiza o funil do cliente =====
    cliente.funil = funil;

    // ===== Salva alterações =====
    await clienteRepo.save(cliente);
    return cliente;
  }
}