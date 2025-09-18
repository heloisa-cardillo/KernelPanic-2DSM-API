import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { EventoTreinamento } from "./EventoTreinamento.js";
import { Funcionario } from "./Funcionario.js";
import { NotificacaoConvidados } from "./NotificacaoConvidados.js";
import { Presenca } from "./Presenca.js";

@Entity()
export class FuncionariosConvidados {
  // Chaves primárias compostas
  @PrimaryColumn()
  funcionario_ID!: number;

  @PrimaryColumn()
  evento_ID!: number;

  // Relacionamento com EventoTreinamento
  @ManyToOne(() => EventoTreinamento, (e) => e.convidados, { onDelete: "CASCADE" })
  @JoinColumn({ name: "evento_ID" }) // Define explicitamente a coluna de join
  evento!: EventoTreinamento;

  // Relacionamento com Funcionario
  @ManyToOne(() => Funcionario, (f) => f.convites, { onDelete: "CASCADE" })
  @JoinColumn({ name: "funcionario_ID" }) // Define explicitamente a coluna de join
  funcionario!: Funcionario;

  // Relação OneToMany para notificações
  @OneToMany(() => NotificacaoConvidados, (nc) => nc.funcionarioConvidado)
  notificacoes?: NotificacaoConvidados[];

  // Relação OneToMany para presenças
  @OneToMany(() => Presenca, (p) => p.funcionarioConvidado)
  presencas?: Presenca[];
}
