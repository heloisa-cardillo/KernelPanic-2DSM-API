import React from 'react'
import './cliente.css'

export default function page() {
  return (
    <div className='conteudo'>
    <div className='container'>
        {/* <div className='formulario'> */}
        <h1>Cadastro Cliente</h1>
        <form action="/salvar-cliente" method='post' className='formulario'>
        <label htmlFor="endereco" className='TextLabel'>Endereço:</label>
        <input className='input1' type="text" id="endereco" name="endereco"></input>

        <label htmlFor="atividade" className='TextLabel'>Atividade:</label>
        <input className='input1' type="text" id="atividade" name="atividade"></input>

        <label htmlFor="seg" className='TextLabel'>Segmento de Atuação:</label>
        <input className='input1' type="text" id="seg" name="seg"></input>

        <div className='input-agrupado'>
          <div className='input-group'>
            <label htmlFor="tel" className='TextLabel'>Telefone:</label>
            <input className='input1' type="text" id="tel" name="tel"></input>
          </div>
          <div className='input-group'>
            <label htmlFor="email" className='TextLabel'>E-mail:</label>
            <input className='input1' type="text" id="email" name="email"></input>
          </div>
          <div className='input-group'>
            <label htmlFor="celular" className='TextLabel'>Celular:</label>
            <input className='input1' type="text" id="celular" name="celular"></input>
          </div>
        </div>

        <label htmlFor="dep" className='TextLabel'>Departamento Responsável:</label>
        <input className='input1' type="text" id="dep" name="dep"></input>

        <button className="botao" >Enviar Formulário</button>
        </form>
        {/* </div> */}

    </div>
    </div>
  )
}
