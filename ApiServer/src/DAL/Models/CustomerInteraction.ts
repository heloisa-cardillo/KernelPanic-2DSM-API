import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CustomerInteraction {
  @PrimaryGeneratedColumn({ type: "int" })
  interaction_id!: number;

  @Column({ type: "int" })
  customer_id!: number;

  @Column({ type: "int" })
  employee_id!: number;

  @Column({ type: "datetime" })
  interaction_date!: Date;

  @Column({ type: "varchar", length: 20 })
  interaction_type!: string;

  @Column({ type: "varchar", length: 255 })
  interaction_report!: string;

  @Column({ type: "int", nullable: true })
  schedule_id?: number;

  // Método estático para criar novas instâncias
  static create(data: {
    customer_id: number;
    employee_id: number;
    interaction_date: Date;
    interaction_type: string;
    interaction_report: string;
    schedule_id?: number;
  }): CustomerInteraction {
    const interaction = new CustomerInteraction();
    Object.assign(interaction, data);
    return interaction;
  }
}