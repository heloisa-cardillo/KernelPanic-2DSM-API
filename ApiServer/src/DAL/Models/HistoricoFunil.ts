import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

// Importações apenas de tipo (não geram código JS)
import type { Cliente } from "./Cliente.js";
import type { FunilVendas } from "./FunilVendas.js";

// Importações reais (para uso no decorator)
import { Cliente as ClienteEntity } from "./Cliente.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";

@Entity()
export class HistoricoFunil {
  @PrimaryGeneratedColumn()
  historico_ID!: number;

  @Column({ type: "timestamp" })
  data_movimentacao!: Date;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.historico
  )
  cliente!: Cliente;

  @ManyToOne(
    () => FunilVendasEntity,
    funil => funil.historico
  )
  funil!: FunilVendas;
}