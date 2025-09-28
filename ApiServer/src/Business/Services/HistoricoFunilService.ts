import { Repository } from "typeorm";
import { AppDataSource } from "../../DAL/ormconfig";
import { HistoricoFunil } from "../../DAL/Models/HistoricoFunil";

export class HistoricoFunilService {
    private historicoFunil: Repository<HistoricoFunil>;

    constructor() {
        this.historicoFunil = AppDataSource.getRepository(HistoricoFunil);
    }
    async listarHistorico(): Promise<HistoricoFunil[]> {
        return this.historicoFunil.find({
            relations: ["cliente", "funil"],
        });
    }

}