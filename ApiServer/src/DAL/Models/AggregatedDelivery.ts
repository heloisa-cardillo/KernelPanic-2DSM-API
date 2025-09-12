// src/Domain/Models/AggregatedDelivery.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vehicle } from "./Vehicle.js";

@Entity()
export class AggregatedDelivery {
  @PrimaryGeneratedColumn({ type: "int" })
  aggregated_id!: number;

  @Column("varchar", { length: 100 })
  driver_name!: string;

  @Column("varchar", { length: 20 })
  gender!: string;

  @Column("varchar", { length: 7 })
  vehicle_plate!: string;

  @Column("varchar", { length: 50 })
  cte_number!: string;

  @Column({ type: "datetime" })
  delivery_date!: Date;

  // Relação com Vehicle
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.deliveries, { nullable: false })
  @JoinColumn({ name: "vehicle_id" })
  vehicle!: Vehicle;


  // Método estático para criar novas instâncias
  static create(data: {
    driver_name: string;
    gender: string;
    vehicle_plate: string;
    cte_number: string;
    delivery_date: Date;
    vehicle: Vehicle;
  }): AggregatedDelivery {
    const delivery = new AggregatedDelivery();
    Object.assign(delivery, data);
    return delivery;
  }
}