import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

// Importações apenas de tipo (evita código circular no JS)
import type { Funcionario } from "./Funcionario.js";
import type { FunilVendas } from "./FunilVendas.js";
import type { ContatoCliente } from "./ContatoCliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";

// Importações reais (apenas para os decorators)
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";
import { ContatoCliente as ContatoClienteEntity } from "./ContatoCliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";
import { AgendamentoInteracao as AgendamentoInteracaoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn({ type: "int" })
  cliente_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "varchar", length: 100 })
  nome!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255 })
  endereco!: string; // Tipo explícito: string

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.clientes
  )
  funcionario!: Funcionario; // Tipo explícito: Funcionario

  @ManyToOne(
    () => FunilVendasEntity,
    (funil: FunilVendas) => funil.clientes
  )
  funil!: FunilVendas; // Tipo explícito: FunilVendas

  @OneToMany(
    () => ContatoClienteEntity,
    (contato: ContatoCliente) => contato.cliente
  )
  contatos?: ContatoCliente[]; // Tipo explícito: ContatoCliente[] | undefined (nullable)

  @OneToMany(
    () => HistoricoFunilEntity,
    (historico: HistoricoFunil) => historico.cliente
  )
  historico?: HistoricoFunil[]; // Tipo explícito: HistoricoFunil[] | undefined (nullable)

  @OneToMany(
    () => AgendamentoInteracaoEntity,
    (agendamento: AgendamentoInteracao) => agendamento.cliente
  )
  agendamentos?: AgendamentoInteracao[]; // Tipo explícito: AgendamentoInteracao[] | undefined (nullable)

  @OneToMany(
    () => InteracaoClienteEntity,
    (interacao: InteracaoCliente) => interacao.cliente
  )
  interacoes?: InteracaoCliente[]; // Tipo explícito: InteracaoCliente[] | undefined (nullable)

  @OneToMany(
    () => VendasEntity,
    (venda: Vendas) => venda.cliente
  )
  vendas?: Vendas[]; // Tipo explícito: Vendas[] | undefined (nullable)
}