import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // Importe o JoinColumn
} from "typeorm";

// Importação de tipo (não gera código JS)
import type { Cliente } from "./Cliente.js";

// Importação real (para uso no decorator)
import { Cliente as ClienteEntity } from "./Cliente.js";

@Entity("Contato_cliente") // Nome da tabela
export class ContatoCliente {
  @PrimaryGeneratedColumn({ name: "contato_cliente_ID" }) // Nome da coluna de ID
  contato_cliente_ID!: number;

  @Column({ name: "tipo_contato", type: "varchar", length: 20 }) // Nome da coluna
  tipo_contato!: string;

  @Column({ name: "valor_contato", type: "varchar", length: 255 }) // Nome da coluna
  valor_contato!: string;

  @ManyToOne(
    () => ClienteEntity,
    (cliente: Cliente) => cliente.contatos
  )
  @JoinColumn({ name: "cliente_ID" }) // Nome da chave estrangeira
  cliente!: Cliente;
}