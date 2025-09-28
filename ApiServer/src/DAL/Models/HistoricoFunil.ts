import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import type { Cliente } from "./Cliente.js";
import type { FunilVendas } from "./FunilVendas.js";

import { Cliente as ClienteEntity } from "./Cliente.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";

@Entity("Historico_funil") 
export class HistoricoFunil {
  @PrimaryGeneratedColumn({ name: "historico_ID" }) 
  historico_ID!: number;

  @Column({ name: "data_movimentacao", type: "timestamp" }) 
  data_movimentacao!: Date;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.historico
  )
  @JoinColumn({ name: "cliente_ID" })
  cliente!: Cliente;

  @ManyToOne(
    () => FunilVendasEntity,
    funil => funil.historico
  )
  @JoinColumn({ name: "funil_ID" }) 
  funil!: FunilVendas;
}