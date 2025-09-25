import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// Importação de tipo para evitar ciclo
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";

// Importação real para os decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity("Vendas") // Nome da tabela
export class Vendas {
  @PrimaryGeneratedColumn({ name: "venda_ID" })
  venda_ID!: number;

  @Column({ name: "data_venda", type: "timestamp" })
  data_venda!: Date;

  @Column({ name: "valor_total", type: "decimal", precision: 10, scale: 2 })
  valor_total!: number;

  @Column({ name: "status", type: "varchar", length: 20 })
  status!: string;

  @ManyToOne(() => ClienteEntity, (c: Cliente) => c.vendas)
  @JoinColumn({ name: "cliente_ID" })
  cliente!: Cliente;

  @ManyToOne(() => FuncionarioEntity, (f: Funcionario) => f.vendas)
  @JoinColumn({ name: "funcionario_ID" })
  funcionario!: Funcionario;
}