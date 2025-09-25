import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("eventos") // Nome da tabela no banco
export class Evento {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "email", type: "varchar", length: 255 })
  email!: string;

  @Column({ name: "titulo", type: "varchar", length: 255 })
  titulo!: string;

  @Column({ name: "dataHora", type: "datetime" })
  dataHora!: Date;
}