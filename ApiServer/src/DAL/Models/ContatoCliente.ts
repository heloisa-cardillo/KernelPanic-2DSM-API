import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // Importa para definir o nome da FK
} from "typeorm";

// ===== Importação de tipo (não gera JS) =====
import type { Cliente } from "./Cliente.js";

// ===== Importação real para decorator =====
import { Cliente as ClienteEntity } from "./Cliente.js";

@Entity("Contato_cliente") // ===== Nome da tabela =====
export class ContatoCliente {
  @PrimaryGeneratedColumn({ name: "contato_cliente_ID" }) // ===== PK =====
  contato_cliente_ID!: number;

  @Column({ name: "tipo_contato", type: "varchar", length: 20 }) // ===== Tipo do contato =====
  tipo_contato!: string;

  @Column({ name: "valor_contato", type: "varchar", length: 255 }) // ===== Valor do contato (ex: email, telefone) =====
  valor_contato!: string;

  // ===== Relação ManyToOne com Cliente =====
  @ManyToOne(() => ClienteEntity, (cliente: Cliente) => cliente.contatos)
  @JoinColumn({ name: "cliente_ID" }) // ===== FK para cliente =====
  cliente!: Cliente;
}