import { Request, Response } from "express";
import {ClienteService} from "../../Business/Services/ClienteService"

export const atribuirContato = async (req: Request,res: Response) =>{
    const body = req.body
    const clienteService = new ClienteService()
    try{
        if(!await clienteService.atribuirContato(body)){
            return res.status(404).send({message : "Deu ruim"})
        }
        return res.status(200).send({message : "Cliente criado com sucesso"})
    }
    catch(error){
        console.error(error)
        return res.status(400).send({message : "Não foi possivel criar o Cliente"})
    }
}


export const criarCliente = async (req: Request,res: Response) =>{
    const body = req.body
    const clienteService = new ClienteService()
    try{
        if(!await clienteService.criarCliente(body)){
            return res.status(404).send({message : "Deu ruim"})
        }
        return res.status(200).send({message : "Contato atribuido com sucesso"})
    }
    catch(error){
        console.error(error)
        return res.status(400).send({message : "Não foi possivel atribuir o Cliente"})
    }
}

export const getClientes = async(req: Request, res: Response) =>{
    const clienteService = new ClienteService()
    try{
        const clientes = await clienteService.listarTodos()
        if(clientes) return res.status(200).send(clientes)
        
        return res.status(404).send({message: "Nenhum cliente encontrado"})
    }catch(err){
        return res.status(500).send({message: "Erro ao buscar clientes"})
    }
}
