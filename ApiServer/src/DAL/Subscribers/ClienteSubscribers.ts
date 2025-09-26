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
    // Verifica se a coluna funil_ID foi alterada
    if (event.updatedColumns.some(col => col.propertyName === "funil")) {
      const repo = event.manager.getRepository(HistoricoFunil);

      const historico = repo.create({
        cliente: { cliente_ID: event.entity!.cliente_ID }, // novo estado do cliente
        funil: { funil_ID: event.entity!.funil.funil_ID }, // novo funil onde ele entrou
        data_movimentacao: new Date(),
      });

      await repo.save(historico);
    }
  }
}