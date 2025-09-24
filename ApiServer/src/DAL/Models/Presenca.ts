import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // Importe o JoinColumn
} from "typeorm";

// Importação apenas para tipos
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importação real para uso no decorator
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity("Presenca") // Nome da tabela
export class Presenca {
  @PrimaryGeneratedColumn({ name: "presenca_ID" })
  presenca_ID!: number;

  @Column({ name: "presente", type: "boolean" })
  presente!: boolean;

  @Column({ name: "razao_recusa", type: "longtext", nullable: true })
  razao_recusa?: string;

  @Column({ name: "data_termino", type: "timestamp", nullable: true })
  data_termino?: Date;

  @Column({ name: "link_feedback", type: "longtext", nullable: true })
  link_feedback?: string;

  @ManyToOne(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.presencas
  )
  @JoinColumn([
    { name: "funcionario_ID", referencedColumnName: "funcionario_ID" },
    { name: "evento_ID", referencedColumnName: "evento_ID" },
  ])
  funcionarioConvidado!: FuncionariosConvidados;
}