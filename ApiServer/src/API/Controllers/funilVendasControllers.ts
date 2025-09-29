import { Request, Response } from "express";
import { ClienteService } from "../../Business/Services/ClienteService";
import { GestaoService } from "../../Business/Services/gestaoService";


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

export const postMoverCliente = async (req: Request, res: Response) => {
  const gestaoService = new GestaoService();
  const body = req.body;
  console.log(body);

  try {
    const cliente = await gestaoService.moverClienteParaNovoFunil(body.cliente_id, body.novo_estagio);

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

