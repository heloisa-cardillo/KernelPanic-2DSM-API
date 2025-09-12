import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Employee.js";

// Criamos um Enum para os status, garantindo segurança de tipo
export enum FacilityStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity()
export class FacilityManagement {
  @PrimaryGeneratedColumn()
  facility_id!: number;

  @Column("timestamp") // Usamos 'timestamp' para maior precisão
  date!: Date;

  // Mudamos de um ID numérico para uma relação Many-to-One com a entidade Employee
  @ManyToOne(() => Employee, (employee) => employee.responsibleForFacilities)
  @JoinColumn({ name: "responsible_employee_id" })
  responsibleEmployee!: Employee;

  @Column({ type: "enum", enum: FacilityStatus, default: FacilityStatus.PENDING })
  status!: FacilityStatus;

  @Column({ type: "varchar", length: 500, nullable: true })
  notes?: string;

  // O método estático de criação agora recebe a entidade Employee, não apenas o ID
  static create(data: {
    date: Date;
    responsibleEmployee: Employee;
    status: FacilityStatus;
    notes?: string;
  }): FacilityManagement {
    const facility = new FacilityManagement();
    Object.assign(facility, data);
    return facility;
  }
}