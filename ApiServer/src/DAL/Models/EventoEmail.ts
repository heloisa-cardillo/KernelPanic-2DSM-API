import { Entity, PrimaryGeneratedColumn, Column, Check } from "typeorm";

@Entity("eventos") // Nome da tabela no banco
@Check(`"categoria" IN ('categoria1', 'categoria2', 'categoria3', 'categoria4')`)

export class Evento {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "email", type: "varchar", length: 255 })
  email!: string;

  @Column({ name: "titulo", type: "varchar", length: 255 })
  titulo!: string;

  @Column({ name: "dataHora", type: "datetime" })
  dataHora!: Date;


  @Column({name: "categoria", type: "varchar", length: 30})
  categoria!: string;



}