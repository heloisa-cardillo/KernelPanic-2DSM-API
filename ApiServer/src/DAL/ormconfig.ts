// import { DataSource } from "typeorm";

// import { Employee } from "./Models/Employee.js";
// import { Customer } from "./Models/Customer.js";
// import { CustomerStage } from "./Models/CustomerStage.js";
// import { CustomerContact } from "./Models/CustomerContact.js";
// import { CustomerInteraction } from "./Models/CustomerInteraction.js";
// import { Sale } from "./Models/Sale.js";
// import { AggregatedDelivery } from "./Models/AggregatedDelivery.js";
// import { Vehicle } from "./Models/Vehicle.js";
// import { EventTraining } from "./Models/EventTraining.js";
// import { Attendance } from "./Models/Attendance.js";
// import { Notification } from "./Models/Notification.js";
// import { FacilityManagement } from "./Models/FacilityManagement.js";

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "-Templa123",
//   database: "newe_database",
//   entities: [
//     Employee,
//     Customer,
//     CustomerStage,
//     CustomerContact,
//     CustomerInteraction,
//     Sale,
//     AggregatedDelivery,
//     Vehicle,
//     EventTraining,
//     Attendance,
//     Notification,
//     FacilityManagement
//   ],
//   migrations: ["src/DAL/migrations/*.ts"], // <---- adicionado
//   synchronize: false, // <---- desliga para usar migrations
//   logging: true
// });
