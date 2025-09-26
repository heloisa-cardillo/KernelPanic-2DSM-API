// src/subscribers/ClienteSubscriber.ts
import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from "typeorm";
import { Cliente } from "../Models/Cliente.js";
import { HistoricoFunil } from "../Models/HistoricoFunil.js";

@EventSubscriber()
export class ClienteSubscriber implements EntitySubscriberInterface<Cliente> {
  listenTo() {
    return Cliente;
  }

  async afterUpdate(event: UpdateEvent<Cliente>) {
    if (!event.entity || !event.databaseEntity) return;

    const antigoFunilId = event.databaseEntity.funil?.funil_ID;
    const novoFunilId = event.entity.funil?.funil_ID;

    // Verifica se o funil_ID mudou
    if (antigoFunilId !== novoFunilId) {
      const repo = event.manager.getRepository(HistoricoFunil);

      const historico = repo.create({
        cliente: { cliente_ID: event.entity.cliente_ID },
        funil: { funil_ID: novoFunilId },
        data_movimentacao: new Date(),
      });

      await repo.save(historico);
    }
  }
}