import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn({ type: "int" })
  attendance_id!: number;

  @Column({ type: "int" })
  employee_id!: number;

  @Column({ type: "int" })
  event_id!: number;

  @Column({ type: "varchar", length: 20 })
  status!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  decline_reason?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  completion_date?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  acquired_knowledge?: string;

  // Método estático para criar novas instâncias
  static create(data: {
    employee_id: number;
    event_id: number;
    status: string;
    decline_reason?: string;
    completion_date?: string;
    acquired_knowledge?: string;
  }): Attendance {
    const attendance = new Attendance();
    Object.assign(attendance, data);
    return attendance;
  }
}