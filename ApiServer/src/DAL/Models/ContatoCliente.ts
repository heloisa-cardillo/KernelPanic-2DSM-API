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
  @PrimaryGeneratedColumn()
  contato_cliente_ID!: number;

  @Column({ length: 20 })
  tipo_contato!: string;

  @Column({ length: 255 })
  valor_contato!: string;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.contatos
  )
  cliente!: Cliente;
}