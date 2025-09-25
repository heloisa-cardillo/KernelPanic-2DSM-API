import cron from "node-cron";
import { AppDataSource } from "../../DAL/ormconfig";
import { Evento } from "../../DAL/Models/EventoEmail";
import { enviarEmail } from "../../Business/Services/eventoEmailService";

export function iniciarCron() {
  cron.schedule("* * * * *", async () => {
    const agora = new Date();
    const inicio = new Date(agora.getTime() - 30000);
    const fim = new Date(agora.getTime() + 30000);

    const eventos = await AppDataSource.getRepository(Evento)
      .createQueryBuilder("evento")
      .where("evento.dataHora BETWEEN :inicio AND :fim", { inicio, fim })
      .getMany();

    eventos.forEach(ev => enviarEmail(ev.email, ev.titulo));
  });
}