import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

// Importação de tipo para evitar ciclo
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";

// Importação real para os decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity()
export class Vendas {
  @PrimaryGeneratedColumn({ type: "int" })
  venda_ID!: number;

  @Column({ type: "timestamp" })  // ou "datetime"
  data_venda!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor_total!: number;

  @Column({ type: "varchar", length: 20 })
  status!: string;

  @ManyToOne(() => ClienteEntity, (c: Cliente) => c.vendas)
  cliente!: Cliente;

  @ManyToOne(() => FuncionarioEntity, (f: Funcionario) => f.vendas)
  funcionario!: Funcionario;
}