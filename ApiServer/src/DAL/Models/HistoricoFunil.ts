import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// Importações só para tipagem (TypeScript)
import type { Cliente } from "./Cliente.js";
import type { FunilVendas } from "./FunilVendas.js";

// Importações reais para decorators do TypeORM
import { Cliente as ClienteEntity } from "./Cliente.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";

@Entity("Historico_funil") // Nome da tabela explícito
export class HistoricoFunil {
  @PrimaryGeneratedColumn({ name: "historico_ID" }) // PK auto-increment
  historico_ID!: number;

  @Column({ name: "data_movimentacao", type: "timestamp" }) // Momento da movimentação
  data_movimentacao!: Date;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.historico
  )
  @JoinColumn({ name: "cliente_ID" }) // FK para Cliente
  cliente!: Cliente;

  @ManyToOne(
    () => FunilVendasEntity,
    funil => funil.historico
  )
  @JoinColumn({ name: "funil_ID" }) // FK para FunilVendas
  funil!: FunilVendas;
}