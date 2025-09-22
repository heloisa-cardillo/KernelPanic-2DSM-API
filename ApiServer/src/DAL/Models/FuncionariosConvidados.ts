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
  @PrimaryColumn({ type: "int" })
  funcionario_ID!: number; // Tipo explícito: number (ID de tipo numérico)

  @PrimaryColumn({ type: "int" })
  evento_ID!: number; // Tipo explícito: number (ID de tipo numérico)

  @ManyToOne(
    () => EventoEntity,
    (evento: EventoTreinamento) => evento.convidados,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "evento_ID" })
  evento!: EventoTreinamento; // Tipo explícito: EventoTreinamento

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.convites,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "funcionario_ID" })
  funcionario!: Funcionario; // Tipo explícito: Funcionario

  @OneToMany(
    () => NotificacaoEntity,
    (notificacaoConvidados: NotificacaoConvidados) => notificacaoConvidados.funcionarioConvidado
  )
  notificacoes?: NotificacaoConvidados[]; // Tipo explícito: NotificacaoConvidados[] | undefined (nullable)

  @OneToMany(
    () => PresencaEntity,
    (presenca: Presenca) => presenca.funcionarioConvidado
  )
  presencas?: Presenca[]; // Tipo explícito: Presenca[] | undefined (nullable)
}