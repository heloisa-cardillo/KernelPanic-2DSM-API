import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Funcionario } from "./Funcionario";
import { FunilVendas } from "./FunilVendas";
import { ContatoCliente } from "./ContatoCliente";
import { HistoricoFunil } from "./HistoricoFunil";
import { AgendamentoInteracao } from "./AgendamentoInteracao";
import { InteracaoCliente } from "./InteracaoCliente";
import { Vendas } from "./Vendas";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  cliente_ID!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 255 })
  endereco!: string;

  @ManyToOne(() => Funcionario, f => f.clientes)
  @JoinColumn({ name: "funcionario_ID" })
  funcionario!: Funcionario;

  @ManyToOne(() => FunilVendas, f => f.clientes)
  @JoinColumn({ name: "funil_ID" })
  funil!: FunilVendas;

  @OneToMany(() => ContatoCliente, c => c.cliente)
  contatos?: ContatoCliente[];

  @OneToMany(() => HistoricoFunil, h => h.cliente)
  historico?: HistoricoFunil[];

  @OneToMany(() => AgendamentoInteracao, a => a.cliente)
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(() => InteracaoCliente, i => i.cliente)
  interacoes?: InteracaoCliente[];

  @OneToMany(() => Vendas, v => v.cliente)
  vendas?: Vendas[];
}