import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Employee } from "./Employee.js"; // Importamos a entidade Employee
import { Notification } from "./Notification.js"; // Importamos a entidade Notification

// Definimos um Enum para os status do evento
// Isso garante que apenas valores válidos sejam usados
export enum EventStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity()
export class EventTraining {
  @PrimaryGeneratedColumn()
  event_id!: number;

  @Column({ type: "varchar", length: 100 })
  title!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  description?: string;

  @Column({ type: "timestamp" }) // Usamos timestamp para maior precisão
  start_date!: Date;

  @Column({ type: "float" })
  duration_hours!: number;

  // Mudamos created_by de number para uma relação real com a entidade Employee.
  // Isso garante a integridade referencial no banco de dados.
  @ManyToOne(() => Employee, (employee) => employee.createdEvents)
  @JoinColumn({ name: "created_by_employee_id" })
  createdBy!: Employee;

  @Column({ type: "varchar", length: 500 })
  document_template!: string;

  @Column({ type: "enum", enum: EventStatus, default: EventStatus.PENDING })
  status!: EventStatus; // Usamos o Enum para o tipo da coluna
  
  // NOVO: Relação inversa para Notification
  @OneToMany(() => Notification, (notification) => notification.event)
  notifications?: Notification[];

  // O método estático de criação agora recebe a entidade Employee,
  // não apenas o ID, para manter a consistência.
  static create(data: {
    title: string;
    start_date: Date;
    duration_hours: number;
    createdBy: Employee;
    document_template: string;
    status: EventStatus;
    description?: string;
  }): EventTraining {
    const event = new EventTraining();
    Object.assign(event, data);
    return event;
  }
}