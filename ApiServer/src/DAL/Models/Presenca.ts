import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

// Importação apenas para tipos
import type { FuncionariosConvidados } from "./FuncionariosConvidados.js";

// Importação real para uso no decorator
import { FuncionariosConvidados as FuncionariosConvidadosEntity } from "./FuncionariosConvidados.js";

@Entity()
export class Presenca {
  @PrimaryGeneratedColumn({ type: "int" })
  presenca_ID!: number;

  @Column({ type: "boolean" })
  presente!: boolean;

  @Column({ type: "longtext", nullable: true })
  razao_recusa?: string;

  @Column({ type: "timestamp", nullable: true })
  data_termino?: Date;

  @Column({ type: "longtext", nullable: true })
  link_feedback?: string;

  @ManyToOne(
    () => FuncionariosConvidadosEntity,
    (fc: FuncionariosConvidados) => fc.presencas
  )
  funcionarioConvidado!: FuncionariosConvidados;
}