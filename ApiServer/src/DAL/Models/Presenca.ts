import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { FuncionariosConvidados } from "./FuncionariosConvidados";

@Entity()
export class Presenca {
  @PrimaryGeneratedColumn()
  presenca_ID!: number;

  @Column()
  presente!: boolean;

  @Column({ type: "longtext", nullable: true })
  razao_recusa?: string;

  @Column({ nullable: true })
  data_termino?: Date;

  @Column({ type: "longtext", nullable: true })
  link_feedback?: string;

  @ManyToOne(() => FuncionariosConvidados, fc => fc.presencas)
  funcionarioConvidado!: FuncionariosConvidados;
}