import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Funcionario } from "./Funcionario";
import { Cliente } from "./Cliente";
import { AgendamentoInteracao } from "./AgendamentoInteracao";

@Entity("InteracaoCliente")
export class InteracaoCliente {
  @PrimaryGeneratedColumn()
  interacao_ID!: number;

  @Column({ type: "date" })
  data_interacao!: Date;

  @Column({ length: 20 })
  tipo_interacao!: string;

  @Column({ length: 255 })
  relatorio_interacao!: string;

  @ManyToOne(() => Funcionario, funcionario => funcionario.interacoes)
  @JoinColumn({ name: "funcionario_ID" }) 
  funcionario!: Funcionario;

  @ManyToOne(() => Cliente, cliente => cliente.interacoes)
  @JoinColumn({ name: "cliente_ID" }) 
  cliente!: Cliente;

  @ManyToOne(() => AgendamentoInteracao, agendamento => agendamento.interacoes)
  @JoinColumn({ name: "agendamento_interacao_ID" }) 
  agendamento!: AgendamentoInteracao;
}