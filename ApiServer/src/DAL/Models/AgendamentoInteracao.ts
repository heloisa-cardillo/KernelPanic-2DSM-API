import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Funcionario } from "./Funcionario";
import { InteracaoCliente } from "./InteracaoCliente";

@Entity("AgendamentoInteracao")
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

  @ManyToOne(() => Cliente, cliente => cliente.agendamentos)
  @JoinColumn({ name: "cliente_ID" }) 
  cliente!: Cliente;

  @ManyToOne(() => Funcionario, funcionario => funcionario.agendamentos)
  @JoinColumn({ name: "funcionario_ID" }) 
  funcionario!: Funcionario;

  @OneToMany(() => InteracaoCliente, i => i.agendamento )
  interacoes?: InteracaoCliente[];
}