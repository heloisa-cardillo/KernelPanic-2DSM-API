import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// Importação de tipo para evitar ciclos (só para tipagem TS)
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";

// Importação real para uso nos decorators do TypeORM
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity("Vendas") // Define o nome da tabela no banco de dados
export class Vendas {
  // Chave primária auto gerada para identificar cada venda
  @PrimaryGeneratedColumn({ name: "venda_ID" })
  venda_ID!: number;

  // Data e hora em que a venda foi realizada
  @Column({ name: "data_venda", type: "timestamp" })
  data_venda!: Date;

  // Valor total da venda com precisão decimal (10 dígitos no total e 2 casas decimais)
  @Column({ name: "valor_total", type: "decimal", precision: 10, scale: 2 })
  valor_total!: number;

  // Status da venda (ex: 'pendente', 'concluída', 'cancelada', etc.)
  @Column({ name: "status", type: "varchar", length: 20 })
  status!: string;

  // Relacionamento muitos-para-um com Cliente
  // Uma venda está associada a um cliente específico
  @ManyToOne(() => ClienteEntity, (c: Cliente) => c.vendas)
  @JoinColumn({ name: "cliente_ID" }) // Coluna que armazena a FK para cliente
  cliente!: Cliente;

  // Relacionamento muitos-para-um com Funcionario
  // Uma venda foi realizada por um funcionário específico
  @ManyToOne(() => FuncionarioEntity, (f: Funcionario) => f.vendas)
  @JoinColumn({ name: "funcionario_ID" }) // Coluna que armazena a FK para funcionário
  funcionario!: Funcionario;
}