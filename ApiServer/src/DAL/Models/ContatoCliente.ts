import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity("contatocliente")
export class ContatoCliente {
  @PrimaryGeneratedColumn()
  Contato_cliente_ID!: number;

  @Column({ length: 20 })
  tipo_contato!: string;

  @Column({ length: 255 })
  valor_contato!: string;

  @ManyToOne(() => Cliente, c => c.contatos )
  @JoinColumn({ name: "cliente_ID" }) 
  cliente!: Cliente;
}