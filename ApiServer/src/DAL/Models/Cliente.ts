import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

// ===== Importações de tipos =====
import type { Funcionario } from "./Funcionario.js";
import type { FunilVendas } from "./FunilVendas.js";
import type { ContatoCliente } from "./ContatoCliente.js";
import type { HistoricoFunil } from "./HistoricoFunil.js";
import type { AgendamentoInteracao } from "./AgendamentoInteracao.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";
import type { Vendas } from "./Vendas.js";

// ===== Importações reais para decorators =====
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";
import { ContatoCliente as ContatoClienteEntity } from "./ContatoCliente.js";
import { HistoricoFunil as HistoricoFunilEntity } from "./HistoricoFunil.js";
import { AgendamentoInteracao as AgendamentoInteracaoEntity } from "./AgendamentoInteracao.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";
import { Vendas as VendasEntity } from "./Vendas.js";

@Entity("Cliente") // ===== Nome da tabela explicitado =====
export class Cliente {
  @PrimaryGeneratedColumn({ name: "cliente_ID" }) // ===== Chave primária =====
  cliente_ID!: number;

  @Column({ name: "nome", type: "varchar", length: 100 }) // ===== Nome do cliente =====
  nome!: string;

  @Column({ name: "endereco", type: "varchar", length: 255 }) // ===== Endereço do cliente =====
  endereco!: string;

  // ===== Novo atributo Segmento de Atuação =====
  @Column({ name: "segmento_atuacao", type: "varchar", length: 40 })
  segmentoAtuacao!: string;

  // ===== Relação ManyToOne com Funcionário =====
  @ManyToOne(() => FuncionarioEntity, (funcionario: Funcionario) => funcionario.clientes)
  @JoinColumn({ name: "funcionario_ID" }) // ===== FK para funcionário =====
  funcionario!: Funcionario;

  // ===== Relação ManyToOne com Funil de Vendas =====
  @ManyToOne(() => FunilVendasEntity, (funil: FunilVendas) => funil.clientes)
  @JoinColumn({ name: "funil_ID" }) // ===== FK para funil =====
  funil!: FunilVendas;

  // ===== Relação OneToMany com Contatos do Cliente =====
  @OneToMany(() => ContatoClienteEntity, (contato: ContatoCliente) => contato.cliente)
  contatos?: ContatoCliente[];

  // ===== Relação OneToMany com Histórico do Funil =====
  @OneToMany(() => HistoricoFunilEntity, (historico: HistoricoFunil) => historico.cliente)
  historico?: HistoricoFunil[];

  // ===== Relação OneToMany com Agendamentos =====
  @OneToMany(() => AgendamentoInteracaoEntity, (agendamento: AgendamentoInteracao) => agendamento.cliente)
  agendamentos?: AgendamentoInteracao[];

  // ===== Relação OneToMany com Interações =====
  @OneToMany(() => InteracaoClienteEntity, (interacao: InteracaoCliente) => interacao.cliente)
  interacoes?: InteracaoCliente[];

  // ===== Relação OneToMany com Vendas =====
  @OneToMany(() => VendasEntity, (venda: Vendas) => venda.cliente)
  vendas?: Vendas[];
}