import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer.js"
import { Employee } from "./Employee.js";

// Enum para status da venda, garantindo valores válidos
export enum SaleStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Interface para definir a estrutura dos dados de criação da venda
export interface SaleCreationData {
  customer: Customer;
  employee: Employee;
  sale_date: Date;
  total_value: number;
  status: SaleStatus;
  notes?: string;
}

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  sale_id!: number;

  // Relação Many-to-One com Customer
  @ManyToOne(() => Customer, (customer: Customer) => customer.sales)
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;

  // Relação Many-to-One com Employee
  @ManyToOne(() => Employee, (employee: Employee) => employee.sales)
  @JoinColumn({ name: "employee_id" })
  employee!: Employee;

  @Column({ type: "timestamp" }) // Usamos timestamp para precisão da data
  sale_date!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_value!: number;

  @Column({ type: "enum", enum: SaleStatus, default: SaleStatus.PENDING })
  status!: SaleStatus;

  // Método estático para criar novas instâncias, usando a interface
  static create(data: SaleCreationData): Sale {
    const sale = new Sale();
    Object.assign(sale, data);
    return sale;
  }
}