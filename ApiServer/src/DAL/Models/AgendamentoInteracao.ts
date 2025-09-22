import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

// Importações apenas de tipo
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";

// Importações reais para os decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";

@Entity()
export class AgendamentoInteracao {
  @PrimaryGeneratedColumn({ type: "int" })
  agendamento_interacao_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "datetime" })
  data_marcada!: Date; // Tipo explícito: Date

  @Column({ type: "varchar", length: 20 })
  tipo_interacao!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 20 })
  status!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255, nullable: true })
  notas?: string; // Tipo explícito: string | undefined (nullable)

  @ManyToOne(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.agendamentos
  )
  cliente!: Cliente; // Tipo explícito: Cliente

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.agendamentos
  )
  funcionario!: Funcionario; // Tipo explícito: Funcionario

  @OneToMany(
    () => InteracaoClienteEntity,
    (interacao: InteracaoCliente) => interacao.agendamento
  )
  interacoes?: InteracaoCliente[]; // Tipo explícito: InteracaoCliente[] | undefined (nullable)
}