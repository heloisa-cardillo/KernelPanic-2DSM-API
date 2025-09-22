import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

// Importações apenas de tipo
import type { Cliente } from "./Cliente.js";
import type { Funcionario } from "./Funcionario.js";
import type { InteracaoCliente } from "./InteracaoCliente.js";

// Importações reais para os decorators
import { Cliente as ClienteEntity } from "./Cliente.js";
import { Funcionario as FuncionarioEntity } from "./Funcionario.js";
import { InteracaoCliente as InteracaoClienteEntity } from "./InteracaoCliente.js";

@Entity()
export class AgendamentoInteracao {
  @PrimaryGeneratedColumn()
  agendamento_interacao_ID!: number;

  @Column()
  data_marcada!: Date;

  @Column({ length: 20 })
  tipo_interacao!: string;

  @Column({ length: 20 })
  status!: string;

  @Column({ length: 255, nullable: true })
  notas?: string;

  @ManyToOne(
    () => ClienteEntity,
    cliente => cliente.agendamentos
  )
  cliente!: Cliente;

  @ManyToOne(
    () => FuncionarioEntity,
    funcionario => funcionario.agendamentos
  )
  funcionario!: Funcionario;

  @OneToMany(
    () => InteracaoClienteEntity,
    interacao => interacao.agendamento
  )
  interacoes?: InteracaoCliente[];
}