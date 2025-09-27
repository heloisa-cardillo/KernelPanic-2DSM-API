import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn, // Importe o JoinColumn
} from "typeorm";

// Importação só para tipagem (TypeScript)
import type { Cliente } from "./Cliente.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Funcionario as FuncionarioType } from "./Funcionario.js"; // para recursivo

// Importação real usada nos decorators (TypeORM)
import { Cliente as ClienteEntity } from "./Cliente.js";
import { AgendamentoInteracao as AgendamentoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";
import { EventoTreinamento as EventoEntity } from "./EventoTreinamento.js";
import { FuncionariosConvidados as ConvidadosEntity } from "./FuncionariosConvidados.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity("Funcionario") // Nome da tabela
@Unique(["email"])
export class Funcionario {
  @PrimaryGeneratedColumn({ name: "funcionario_ID" })
  funcionario_ID!: number;

  @Column({ name: "nome", type: "varchar", length: 100 })
  nome!: string;

  @Column({ name: "genero", type: "varchar", length: 10 })
  genero!: string;

  @Column({ name: "endereco", type: "varchar", length: 255 })
  endereco!: string;

  @Column({ name: "numero_telefone", type: "varchar", length: 20 })
  numero_telefone!: string;

  @Column({ name: "cargo", type: "varchar", length: 50 })
  cargo!: string;

  @Column({ name: "email", type: "varchar", length: 50 })
  email!: string;

  @Column({ name: "senha_hash", type: "varchar", length: 255 })
  senha_hash!: string;

  @Column({ name: "nivel_acesso", type: "varchar", length: 255 })
  nivel_acesso!: string;

  @Column({ name: "localizacao_funcionario", type: "varchar", length: 100 })
  localizacao_funcionario!: string;

  @ManyToOne(
    () => FuncionarioEntity,
    (gerente: FuncionarioType) => gerente.subordinados,
    { nullable: true }
  )
  @JoinColumn({ name: "gerente_ID" }) // Nome da chave estrangeira recursiva
  gerente_ID?: FuncionarioType;

  @OneToMany(
    () => FuncionarioEntity,
    (funcionario: FuncionarioType) => funcionario.gerente_ID
  )
  subordinados?: FuncionarioType[];

  @OneToMany(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.funcionario
  )
  clientes?: Cliente[];

  @OneToMany(
    () => AgendamentoEntity,
    (agendamento: AgendamentoInteracao) => agendamento.funcionario
  )
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(
    () => InteracaoEntity,
    (interacao: InteracaoCliente) => interacao.funcionario
  )
  interacoes?: InteracaoCliente[];

  @OneToMany(
    () => VendasEntity,
    (venda: Vendas) => venda.funcionario
  )
  vendas?: Vendas[];

  @OneToMany(
    () => EventoEntity,
    (evento: EventoTreinamento) => evento.organizador_ID
  )
  eventosOrganizados?: EventoTreinamento[];

  @OneToMany(
    () => ConvidadosEntity,
    (convite: FuncionariosConvidados) => convite.funcionario
  )
  convites?: FuncionariosConvidados[];
}