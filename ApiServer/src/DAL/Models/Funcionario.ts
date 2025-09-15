import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique
} from "typeorm";
import { Cliente } from "./Cliente";
import { EventoTreinamento } from "./EventoTreinamento";
import { AgendamentoInteracao } from "./AgendamentoInteracao";
import { InteracaoCliente } from "./InteracaoCliente";
import { Vendas } from "./Vendas";
import { FuncionariosConvidados } from "./FuncionariosConvidados";

@Entity()
@Unique(["email"])
export class Funcionario {
  @PrimaryGeneratedColumn()
  funcionario_ID!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 10 })
  genero!: string;

  @Column({ length: 255 })
  endereco!: string;

  @Column({ length: 20 })
  numero_telefone!: string;

  @Column({ length: 50 })
  cargo!: string;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 255 })
  senha_hash!: string;

  @Column({ length: 255 })
  nivel_acesso!: string;

  @Column({ length: 100 })
  localizacao_funcionario!: string;

  @ManyToOne(() => Funcionario, gerente => gerente.subordinados, { nullable: true })
  gerente?: Funcionario;

  @OneToMany(() => Funcionario, f => f.gerente)
  subordinados?: Funcionario[];

  @OneToMany(() => Cliente, c => c.funcionario)
  clientes?: Cliente[];

  @OneToMany(() => AgendamentoInteracao, a => a.funcionario)
  agendamentos?: AgendamentoInteracao[];

  @OneToMany(() => InteracaoCliente, i => i.funcionario)
  interacoes?: InteracaoCliente[];

  @OneToMany(() => Vendas, v => v.funcionario)
  vendas?: Vendas[];

  @OneToMany(() => EventoTreinamento, e => e.organizador)
  eventosOrganizados?: EventoTreinamento[];

  @OneToMany(() => FuncionariosConvidados, fc => fc.funcionario)
  convites?: FuncionariosConvidados[];
}