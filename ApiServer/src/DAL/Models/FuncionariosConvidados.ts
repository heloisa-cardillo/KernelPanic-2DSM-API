import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

// Importações só para tipagem (TypeScript)
import type { EventoTreinamento } from "./EventoTreinamento.js";
import type { Funcionario } from "./Funcionario.js";
import type { NotificacaoConvidados } from "./NotificacaoConvidados.js";
import type { Presenca } from "./Presenca.js";

// Importações reais para decorators (TypeORM)
import { EventoTreinamento as EventoEntity } from "./EventoTreinamento.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { NotificacaoConvidados as NotificacaoEntity } from "./NotificacaoConvidados.js";
import { Presenca as PresencaEntity } from "./Presenca.js";

@Entity("Funcionarios_convidados") // Nome explícito da tabela
export class FuncionariosConvidados {
  @PrimaryColumn({ name: "funcionario_id", type: "int" })
  funcionario_ID!: number; // PK composta parte 1

  @PrimaryColumn({ name: "evento_id", type: "int" })
  evento_ID!: number; // PK composta parte 2

  // Relação ManyToOne com EventoTreinamento
  @ManyToOne(
    () => EventoEntity,
    (evento: EventoTreinamento) => evento.convidados,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "evento_id" }) // FK para evento_id
  evento!: EventoTreinamento;

  // Relação ManyToOne com Funcionario
  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario: Funcionario) => funcionario.convites,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "funcionario_id" }) // FK para funcionario_id
  funcionario!: Funcionario;

  // Relação OneToMany com NotificacaoConvidados
  @OneToMany(
    () => NotificacaoEntity,
    (notificacaoConvidados: NotificacaoConvidados) => notificacaoConvidados.funcionarioConvidado
  )
  notificacoes?: NotificacaoConvidados[];

  // Relação OneToMany com Presenca
  @OneToMany(
    () => PresencaEntity,
    (presenca: Presenca) => presenca.funcionarioConvidado
  )
  presencas?: Presenca[];
}