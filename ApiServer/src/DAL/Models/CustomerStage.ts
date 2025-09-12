import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CustomerStage {
  @PrimaryGeneratedColumn({ type: "int" })
  stage_id!: number;

  @Column({ type: "varchar", length: 20 })
  stage_name!: string;

  // Método estático para criar novas instâncias
  static create(data: { stage_name: string }): CustomerStage {
    const stage = new CustomerStage();
    Object.assign(stage, data);
    return stage;
  }
}