import { Request, Response } from "express";
import { ClienteService } from "../../Business/Services/ClienteService";

// ===== Retorna status simples para checar funcionamento =====
export const getHistoricoFunil = (req: Request, res: Response) => {
  res.send("Ta funcionando");
};

// ===== Atualiza funil do cliente =====
export const putFunilCliente = (req: Request, res: Response) => {
  const { id_cliente, novo_funil_id } = req.body;
  const clienteService = new ClienteService();

  try {
    clienteService.editarFunilCliente(id_cliente, novo_funil_id);
    return res.status(200).send({ message: "Cliente atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Não foi possivel editar" });
  }
};

// ===== Lista todos os clientes =====
export const getClientes = async (req: Request, res: Response) => {
  const clienteRepo = new ClienteService();

  try {
    const clientes = await clienteRepo.listarTodos();
    return res.send({ message: clientes });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Erro ao buscar clientes" });
  }
};

// ===== Move cliente para novo estágio no funil =====
export const postMoverCliente = async (req: Request, res: Response) => {
  const clienteRepo = new ClienteService();
  const body = req.body;
  console.log(body);

  try {
    const cliente = await clienteRepo.editarFunilCliente(body.cliente_id, body.novo_estagio);

    if (!cliente) {
      return res.status(404).send({ message: "Cliente não encontrado ou não atualizado." });
    }

    return res.status(200).send({ message: "Cliente atualizado com sucesso", cliente });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Erro ao atualizar cliente",
      error: err instanceof Error ? err.message : err,
    });
  }
};