'use client'

import React, { useState } from 'react'
import styles from './App.module.css'

export default function Page() {
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [funcionarioId, setFuncionarioId] = useState(0);
  const [funilId, setFunilId] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setMessage('');

    const formData = {
      nome: nome,
      endereco: endereco,
      "funcionario_id:": funcionarioId,
      "funil_id": funilId
    };

    console.log('Enviando os seguintes dados:', formData);

    try {
      const response = await fetch('http://localhost:5000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Resposta do servidor:', result);

      setMessage('Cadastro realizado com sucesso!');

      setNome('');
      setEndereco('');
      setFuncionarioId(0);
      setFunilId(0);

    } catch (error) {
      console.error('Falha ao enviar dados:', error);
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className={styles.conteudo}>
      <div className={styles.container}>
        <h1>Cadastro de Oportunidade</h1>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          {/* Campos do formulário (sem alteração) */}
          <label htmlFor="nome" className={styles.textLabel}>Nome:</label>
          <input
            className={styles.input1}
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label htmlFor="endereco" className={styles.textLabel}>Endereço:</label>
          <input
            className={styles.input1}
            type="text"
            id="endereco"
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <label htmlFor="funcionario" className={styles.textLabel}>Funcionário Responsável:</label>
          <select
            className={styles.input1}
            id="funcionario"
            name="funcionario"
            value={funcionarioId}
            onChange={(e) => setFuncionarioId(Number(e.target.value))}
          >
            <option value={0}></option>
            <option value={1}>Carlos Silva</option>
            <option value={2}>Ana Oliveira</option>
            <option value={3}>João Souza</option>
          </select>
          <label htmlFor="funil" className={styles.textLabel}>Funil de Vendas:</label>
          <select
            className={styles.input1}
            id="funil"
            name="funil"
            value={funilId}
            onChange={(e) => setFunilId(Number(e.target.value))}
          > <option value={0}></option>
            <option value={1}>Prospecção</option>
            <option value={2}>Inicial</option>
            <option value={3}>Potencial</option>
            <option value={4}>Manutenção</option>
            <option value={5}>Negociação</option>
            <option value={6}>FollowUP</option>
            <option value={7}>Vendas</option>
            <option value={8}>NaoVendas</option>
           </select>
          
          <button type="submit" className={styles.botao} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Formulário'}
          </button>

          {/* Exibe a mensagem de sucesso ou erro */}
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  )
}