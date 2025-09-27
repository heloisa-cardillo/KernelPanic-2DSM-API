import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // Importe o JoinColumn
} from "typeorm";

// Importações apenas de tipo (não geram código JS)
import type { Cliente } from "./Cliente.js";
import type { FunilVendas } from "./FunilVendas.js";

// Importações reais (para uso no decorator)
import { Cliente as ClienteEntity } from "./Cliente.js";
import { FunilVendas as FunilVendasEntity } from "./FunilVendas.js";

@Entity("Historico_funil") // Nome explícito da tabela
export class HistoricoFunil {
  @PrimaryGeneratedColumn({ name: "historico_ID" })
  historico_ID!: number;

  @Column({ name: "data_movimentacao", type: "timestamp" })
  data_movimentacao!: Date;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.historico
  )
  @JoinColumn({ name: "cliente_ID" }) // Nome explícito da chave estrangeira
  cliente!: Cliente;

  @ManyToOne(
    () => FunilVendasEntity,
    funil => funil.historico
  )
  @JoinColumn({ name: "funil_ID" }) // Nome explícito da chave estrangeira
  funil!: FunilVendas;
}