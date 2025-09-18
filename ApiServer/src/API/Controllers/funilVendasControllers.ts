import { Request, Response } from "express"
import {ClienteService} from "../../Business/Services/ClienteService"


export const getHistoricoFunil = (req: Request, res: Response) =>{
    res.send("Ta funcionando")
}

export const putFunilCliente = (req: Request, res: Response) =>{
    const body = req.body
    const id_cliente = body.id_cliente
    const novo_funil_id = body.novo_funil_id

    const clienteService = new ClienteService()

    try{
        clienteService.editarFunilCliente(id_cliente, novo_funil_id)
        return res.status(200).send({message : "Cliente atualizado com sucesso"})
    }
    catch(error){
        console.error(error)
        return res.status(400).send({message : "Não foi possivel editar"})
    }
}

export const getClientes = async (req:Request, res:Response) => {
    const clienteRepo = new ClienteService()

    try{
        const clientes =  await clienteRepo.listarTodos()
        return res.send({message:clientes})
    }catch(err){
        return res.send({message: "Erroo"})
    }
}