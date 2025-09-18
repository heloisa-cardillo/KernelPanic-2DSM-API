import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./Cliente.js";
import { Funcionario } from "./Funcionario.js";
import { InteracaoCliente } from "./InteracaoCliente.js";

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

  @ManyToOne(() => Cliente, cliente => cliente.agendamentos)
  cliente!: Cliente;

  @ManyToOne(() => Funcionario, funcionario => funcionario.agendamentos)
  funcionario!: Funcionario;

  @OneToMany(() => InteracaoCliente, interacaoCliente => interacaoCliente.agendamento)
  interacoes?: InteracaoCliente[];
}
