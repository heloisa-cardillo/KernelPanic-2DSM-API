import { DataSource } from "typeorm";

import { Employee } from "../Domain/Models/Employee.js";
import { Customer } from "../Domain/Models/Customer.js";
import { CustomerStage } from "../Domain/Models/CustomerStage.js";
import { CustomerContact } from "../Domain/Models/CustomerContact.js";
import { CustomerInteraction } from "../Domain/Models/CustomerInteraction.js";
import { Sale } from "../Domain/Models/Sale.js";
import { AggregatedDelivery } from "../Domain/Models/AggregatedDelivery.js";
import { Vehicle } from "../Domain/Models/Vehicle.js";
import { EventTraining } from "../Domain/Models/EventTraining.js";
import { Attendance } from "../Domain/Models/Attendance.js";
import { Notification } from "../Domain/Models/Notification.js";
import { FacilityManagement } from "../Domain/Models/FacilityManagement.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "-Templa123",
  database: "newe_database",
  entities: [
    Employee,
    Customer,
    CustomerStage,
    CustomerContact,
    CustomerInteraction,
    Sale,
    AggregatedDelivery,
    Vehicle,
    EventTraining,
    Attendance,
    Notification,
    FacilityManagement
  ],
  migrations: ["src/DAL/migrations/*.ts"], // <---- adicionado
  synchronize: false, // <---- desliga para usar migrations
  logging: true
});
