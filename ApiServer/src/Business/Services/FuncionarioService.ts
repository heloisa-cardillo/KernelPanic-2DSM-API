import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { Funcionario } from "../../DAL/Models/Funcionario";

export class FuncionarioService {
  private vendedorRepo: Repository<Funcionario>;

  constructor() {
    this.vendedorRepo = AppDataSource.getRepository(Funcionario);
  }


  async getVendedor(): Promise<Funcionario | null> {
    return this.vendedorRepo.findOne({
      where: {cargo: "Vendedor"},
      relations: [
        "clientes",
        "agendamentos",
        "interacoes",
        "vendas",
      ]
    });
  }
}