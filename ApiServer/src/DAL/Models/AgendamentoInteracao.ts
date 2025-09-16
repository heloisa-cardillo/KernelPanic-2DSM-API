import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { Funcionario } from "./Funcionario";
import { InteracaoCliente } from "./InteracaoCliente";

@Entity()
export class AgendamentoInteracao {
  @PrimaryGeneratedColumn()
  agendamento_interacao_ID!: number;

  @Column()
  data_marcada!: Date;

  @Column({ length: 20 })
  tipo_interacao!: string;

  @Column({ length: 20 })
  status!: string;

  @Column({ length: 255, nullable: true })
  notas?: string;

  @ManyToOne(() => Cliente, c => c.agendamentos)
  cliente!: Cliente;

  @ManyToOne(() => Funcionario, f => f.agendamentos)
  funcionario!: Funcionario;

  @OneToMany(() => InteracaoCliente, i => i.agendamento)
  interacoes?: InteracaoCliente[];
}