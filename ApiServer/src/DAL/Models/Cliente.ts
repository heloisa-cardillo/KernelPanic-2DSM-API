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
  @PrimaryGeneratedColumn()
  cliente_ID!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 255 })
  endereco!: string;

  @ManyToOne(
    () => FuncionarioEntity,
    funcionario => funcionario.clientes
  )
  funcionario!: Funcionario;

  @ManyToOne(
    () => FunilVendasEntity,
    funil => funil.clientes
  )
  funil!: FunilVendas;

  @OneToMany(
    () => ContatoClienteEntity,
    contato => contato.cliente
  )
  contatos?: ContatoCliente[];

  @OneToMany(
    () => HistoricoFunilEntity,
    historico => historico.cliente
  )
  historico?: HistoricoFunil[];

  @OneToMany(
    () => AgendamentoInteracaoEntity,
    agendamento => agendamento.cliente
  )
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(
    () => InteracaoClienteEntity,
    interacao => interacao.cliente
  )
  interacoes?: InteracaoCliente[];

  @OneToMany(
    () => VendasEntity,
    venda => venda.cliente
  )
  vendas?: Vendas[];
}