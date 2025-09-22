import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

// Importação só para tipos
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { Funcionario } from "./Funcionario.js";
import type { NotificacaoConvidados } from "./NotificacaoConvidados.js";
import type { Presenca } from "./Presenca.js";

// Importação real para os decorators
import { EventoTreinamento as EventoEntity } from "./EventoTreinamento.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { NotificacaoConvidados as NotificacaoEntity } from "./NotificacaoConvidados.js";
import { Presenca as PresencaEntity } from "./Presenca.js";

@Entity()
export class FuncionariosConvidados {
  @PrimaryColumn()
  funcionario_ID!: number;

  @PrimaryColumn()
  evento_ID!: number;

  @ManyToOne(
    () => EventoEntity,
    (evento: EventoTreinamento) => evento.convidados,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "evento_ID" })
  evento!: EventoTreinamento;

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.convites,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "funcionario_ID" })
  funcionario!: Funcionario;

  @OneToMany(
    () => NotificacaoEntity,
    (notificacaoConvidados: NotificacaoConvidados) => notificacaoConvidados.funcionarioConvidado
  )
  notificacoes?: NotificacaoConvidados[];

  @OneToMany(
    () => PresencaEntity,
    (presenca: Presenca) => presenca.funcionarioConvidado
  )
  presencas?: Presenca[];
}