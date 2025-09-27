import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn, // Importe o JoinColumn para definir o nome das chaves estrangeiras
} from "typeorm";

// Importações apenas de tipo
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";

// Importações reais para os decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";

@Entity("Agendamento_interacao") // Nome da tabela definido explicitamente
export class AgendamentoInteracao {
  @PrimaryGeneratedColumn({ name: "agendamento_interacao_ID" }) // Nome da coluna de ID
  agendamento_interacao_ID!: number;

  @Column({ name: "data_marcada", type: "datetime" }) // Nome da coluna
  data_marcada!: Date;

  @Column({ name: "tipo_interacao", type: "varchar", length: 20 }) // Nome da coluna
  tipo_interacao!: string;

  @Column({ name: "status", type: "varchar", length: 20 }) // Nome da coluna
  status!: string;

  @Column({ name: "notas", type: "varchar", length: 255, nullable: true }) // Nome da coluna
  notas?: string;

  @ManyToOne(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.agendamentos
  )
  @JoinColumn({ name: "cliente_ID" }) // Nome da coluna de chave estrangeira
  cliente!: Cliente;

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.agendamentos
  )
  @JoinColumn({ name: "funcionario_ID" }) // Nome da coluna de chave estrangeira
  funcionario!: Funcionario;

  @OneToMany(
    () => InteracaoClienteEntity,
    (interacao: InteracaoCliente) => interacao.agendamento
  )
  interacoes?: InteracaoCliente[];
}