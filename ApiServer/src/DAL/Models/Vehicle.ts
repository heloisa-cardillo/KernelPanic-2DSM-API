// src/Domain/Models/Vehicle.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AggregatedDelivery } from "./AggregatedDelivery.js";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn({ type: "int" })
  vehicle_id!: number;

  @Column("varchar", { length: 7 })
  plate_number!: string;

  @Column("varchar", { length: 20 })
  model!: string;

  // Relação inversa com AggregatedDelivery
  @OneToMany(() => AggregatedDelivery, (employee) => employee.vehicle)
  deliveries?: AggregatedDelivery[];


  // Método estático para criar novas instâncias
  static create(data: { plate_number: string; model: string }): Vehicle {
    const vehicle = new Vehicle();
    Object.assign(vehicle, data);
    return vehicle;
  }
}