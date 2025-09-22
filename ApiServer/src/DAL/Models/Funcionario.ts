import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";

// Importação só para tipagem (TypeScript)
import type { Cliente } from "./Cliente.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import type { Funcionario as FuncionarioType } from "./Funcionario.js"; // pra recursivo

// Importação real usada nos decorators (TypeORM)
import { Cliente as ClienteEntity } from "./Cliente.js";
import { AgendamentoInteracao as AgendamentoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";
import { EventoTreinamento as EventoEntity } from "./EventoTreinamento.js";
import { FuncionariosConvidados as ConvidadosEntity } from "./FuncionariosConvidados.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";

@Entity()
@Unique(["email"])
export class Funcionario {
  @PrimaryGeneratedColumn()
  funcionario_ID!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 10 })
  genero!: string;

  @Column({ length: 255 })
  endereco!: string;

  @Column({ length: 20 })
  numero_telefone!: string;

  @Column({ length: 50 })
  cargo!: string;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 255 })
  senha_hash!: string;

  @Column({ length: 255 })
  nivel_acesso!: string;

  @Column({ length: 100 })
  localizacao_funcionario!: string;

  @ManyToOne(
    () => FuncionarioEntity,
    gerente => gerente.subordinados,
    { nullable: true }
  )
  gerente?: FuncionarioType;

  @OneToMany(
    () => FuncionarioEntity,
    funcionario => funcionario.gerente
  )
  subordinados?: FuncionarioType[];

  @OneToMany(
    () => ClienteEntity,
    cliente => cliente.funcionario
  )
  clientes?: Cliente[];

  @OneToMany(
    () => AgendamentoEntity,
    agendamento => agendamento.funcionario
  )
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(
    () => InteracaoEntity,
    interacao => interacao.funcionario
  )
  interacoes?: InteracaoCliente[];

  @OneToMany(
    () => VendasEntity,
    venda => venda.funcionario
  )
  vendas?: Vendas[];

  @OneToMany(
    () => EventoEntity,
    evento => evento.organizador
  )
  eventosOrganizados?: EventoTreinamento[];

  @OneToMany(
    () => ConvidadosEntity,
    convite => convite.funcionario
  )
  convites?: FuncionariosConvidados[];
}