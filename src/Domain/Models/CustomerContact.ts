import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CustomerContact {
  @PrimaryGeneratedColumn({ type: "int" })
  contact_id!: number; // gerado pelo TypeORM

  @Column({ type: "int" })
  customer_id!: number;

  @Column({ type: "varchar", length: 20 })
  contact_type!: string;

  @Column({ type: "varchar", length: 255 })
  contact_value!: string;

  // Método estático para criar novas instâncias
  static create(data: {
    customer_id: number;
    contact_type: string;
    contact_value: string;
  }): CustomerContact {
    const contact = new CustomerContact();
    Object.assign(contact, data);
    return contact;
  }
}