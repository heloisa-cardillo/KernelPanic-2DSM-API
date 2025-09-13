import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Funcionario } from "./Funcionario";
import { Cliente } from "./Cliente";
import { AgendamentoInteracao } from "./AgendamentoInteracao";

@Entity()
export class InteracaoCliente {
  @PrimaryGeneratedColumn()
  interacao_ID!: number;

  @Column({ type: "date" })
  data_interacao!: Date;

  @Column({ length: 20 })
  tipo_interacao!: string;

  @Column({ length: 255 })
  relatorio_interacao!: string;

  @ManyToOne(() => Funcionario, f => f.interacoes)
  funcionario!: Funcionario;

  @ManyToOne(() => Cliente, c => c.interacoes)
  cliente!: Cliente;

  @ManyToOne(() => AgendamentoInteracao, a => a.interacoes, { nullable: true })
  agendamento?: AgendamentoInteracao;
}