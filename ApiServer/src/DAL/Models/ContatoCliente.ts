import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

// Importação de tipo (não gera código JS)
import type { Cliente } from "./Cliente.js";

// Importação real (para uso no decorator)
import { Cliente as ClienteEntity } from "./Cliente.js";

@Entity()
export class ContatoCliente {
  @PrimaryGeneratedColumn({ type: "int" })
  contato_cliente_ID!: number; // Tipo explícito: number (ID gerado automaticamente)

  @Column({ type: "varchar", length: 20 })
  tipo_contato!: string; // Tipo explícito: string

  @Column({ type: "varchar", length: 255 })
  valor_contato!: string; // Tipo explícito: string

  @ManyToOne(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.contatos
  )
  cliente!: Cliente; // Tipo explícito: Cliente
}