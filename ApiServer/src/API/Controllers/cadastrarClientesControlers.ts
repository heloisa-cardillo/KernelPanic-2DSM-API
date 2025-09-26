import { Request, Response } from "express";
import { ClienteService } from "../../Business/Services/ClienteService";

export const criarCliente = async (req: Request, res: Response) => {
  // ===== Extrai o corpo da requisição =====
  const body = req.body;

  // ===== Instancia o serviço de cliente =====
  const clienteService = new ClienteService();

  try {
    // ===== Tenta criar o cliente =====
    const criado = await clienteService.criarCliente(body);

    if (!criado) {
      // ===== Caso a criação falhe, responde com status 404 =====
      return res.status(404).send({ message: "Deu ruim" });
    }

    // ===== Caso a criação seja bem-sucedida =====
    return res.status(200).send({ message: "Cliente criado com sucesso" });
  } catch (error) {
    // ===== Tratamento de erro =====
    console.error(error);
    return res.status(400).send({ message: "Não foi possivel criar o Cliente" });
  }
};
