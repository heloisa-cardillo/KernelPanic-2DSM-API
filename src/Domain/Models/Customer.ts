import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sale } from "./Sale.js"; // Importamos a entidade Sale

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("increment")
  customer_id!: number;

  @Column({ type: "varchar", length: 100 })
  full_name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone_number?: string;
  
  // Relação inversa: lista de vendas do cliente
  @OneToMany(() => Sale, (sale) => sale.customer)
  sales?: Sale[];

  // Método estático para criar novas instâncias
  static create(data: {
    full_name: string;
    email?: string;
    phone_number?: string;
  }): Customer {
    const customer = new Customer();
    Object.assign(customer, data);
    return customer;
  }
}