import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { EventTraining } from "./EventTraining.js";
import { FacilityManagement } from "./FacilityManagement.js";
import { Notification } from "./Notification.js";
import { Sale } from "./Sale.js";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ type: "int" })
  employee_id!: number;

  @Column({ type: "varchar", length: 100 })
  full_name!: string;

  @Column({ type: "varchar", length: 10 })
  gender!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @Column({ type: "varchar", length: 20 })
  phone_number!: string;

  @Column({ type: "varchar", length: 50 })
  role!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password_hash!: string;

  @Column({ type: "varchar", length: 50 })
  access_level!: string;

  @Column({ type: "varchar", length: 100 })
  employee_location!: string;

  @ManyToOne(() => Employee, (employee) => employee.subordinates, { nullable: true })
  @JoinColumn({ name: "manager_id" })
  manager?: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  subordinates?: Employee[];

  @OneToMany(() => EventTraining, (event) => event.createdBy)
  createdEvents?: EventTraining[];

  @OneToMany(() => FacilityManagement, (facility) => facility.responsibleEmployee)
  responsibleForFacilities?: FacilityManagement[];

  @OneToMany(() => Notification, (notification) => notification.employee)
  notifications?: Notification[];

  @OneToMany(() => Sale, (sale) => sale.employee)
  sales?: Sale[];

  static create(data: {
    full_name: string;
    gender: string;
    address: string;
    phone_number: string;
    role: string;
    email: string;
    password_hash: string;
    access_level: string;
    employee_location: string;
    manager?: Employee;
  }): Employee {
    const employee = new Employee();
    Object.assign(employee, data);
    return employee;
  }
}