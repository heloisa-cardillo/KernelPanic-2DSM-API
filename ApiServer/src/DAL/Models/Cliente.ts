import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Funcionario } from "./Funcionario.js";
import { FunilVendas } from "./FunilVendas.js";
import { ContatoCliente } from "./ContatoCliente.js";
import { HistoricoFunil } from "./HistoricoFunil.js";
import { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import { InteracaoCliente } from "./InteracaoCliente.js";
import { Vendas } from "./Vendas.js";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  cliente_ID!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 255 })
  endereco!: string;

  @ManyToOne(() => Funcionario, funcionario => funcionario.clientes)
  funcionario!: Funcionario;

  @ManyToOne(() => FunilVendas, funil => funil.clientes)
  funil!: FunilVendas;

  @OneToMany(() => ContatoCliente, contato => contato.cliente)
  contatos?: ContatoCliente[];

  @OneToMany(() => HistoricoFunil, historico => historico.cliente)
  historico?: HistoricoFunil[];

  @OneToMany(() => AgendamentoInteracao, agendamento => agendamento.cliente)
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(() => InteracaoCliente, interacao => interacao.cliente)
  interacoes?: InteracaoCliente[];

  @OneToMany(() => Vendas, venda => venda.cliente)
  vendas?: Vendas[];
}