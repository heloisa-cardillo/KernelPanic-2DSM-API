import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Employee.js";
import { EventTraining } from "./EventTraining.js";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id!: number;

  // Relacionamento Many-to-One com Employee
  @ManyToOne(() => Employee, (employee) => employee.notifications)
  @JoinColumn({ name: "employee_id" })
  employee!: Employee;

  // Relacionamento Many-to-One com EventTraining
  @ManyToOne(() => EventTraining, (event) => event.notifications)
  @JoinColumn({ name: "event_id" })
  event!: EventTraining;

  @Column({ type: "varchar", length: 100 })
  title!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  message?: string;

  @Column({ type: "timestamp" }) // Usamos timestamp para maior precisão
  sent_date!: Date;

  @Column({ type: "boolean" })
  read_status!: boolean;

  // Método estático para criar novas instâncias
  static create(data: {
    employee: Employee;
    event: EventTraining;
    title: string;
    sent_date: Date;
    read_status: boolean;
    message?: string;
  }): Notification {
    const notification = new Notification();
    Object.assign(notification, data);
    return notification;
  }
}
