import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Funcionario } from "./Funcionario.js";
import { FuncionariosConvidados } from "./FuncionariosConvidados.js";
import { Notificacao } from "./Notificacao.js";

@Entity()
export class EventoTreinamento {
  @PrimaryGeneratedColumn()
  evento_ID!: number;

  @Column({ length: 100 })
  titulo!: string;

  @Column({ type: "longtext", nullable: true })
  descricao?: string;

  @Column()
  data_inicio!: Date;

  @Column({ type: "float" })
  duracao_horas!: number;

  @Column({ type: "longtext" })
  evento_link!: string;

  @Column({ length: 20 })
  status!: string;

  @ManyToOne(() => Funcionario, f => f.eventosOrganizados)
  organizador!: Funcionario;

  @OneToMany(() => FuncionariosConvidados, fc => fc.evento)
  convidados?: FuncionariosConvidados[];

  @OneToMany(() => Notificacao, (notificacao) => notificacao.evento)
  notificacoes?: Notificacao[];

}