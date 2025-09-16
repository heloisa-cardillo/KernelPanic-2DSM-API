import { Entity, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { EventoTreinamento } from "./EventoTreinamento";
import { Funcionario } from "./Funcionario";
import { NotificacaoConvidados } from "./NotificacaoConvidados";
import { Presenca } from "./Presenca";

@Entity()
export class FuncionariosConvidados {
  @PrimaryColumn()
  funcionario_ID!: number;

  @PrimaryColumn()
  evento_ID!: number;

  @ManyToOne(() => EventoTreinamento, e => e.convidados)
  evento!: EventoTreinamento;

  @ManyToOne(() => Funcionario, f => f.convites)
  funcionario!: Funcionario;

  @OneToMany(() => NotificacaoConvidados, nc => nc.funcionarioConvidado)
  notificacoes?: NotificacaoConvidados[];

  @OneToMany(() => Presenca, p => p.funcionarioConvidado)
  presencas?: Presenca[];
}