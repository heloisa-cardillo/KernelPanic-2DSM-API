'use client'

import React, { useState } from 'react'
import styles from './App.module.css'

export default function Page() {
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [funcionarioId, setFuncionarioId] = useState(1);
  const [funilId, setFunilId] = useState(5); // Valor inicial atualizado
  
  // 1. Novos estados para os novos campos
  const [tipoContato, setTipoContato] = useState('email'); // 'email' como padrão
  const [valorContato, setValorContato] = useState('');
  const [ClienteId, setClienteId] = useState(1);

  const [tipoContatoAdd, setTipoContatoAdd] = useState('email');
  const [valorContatoAdd, setValorContatoAdd] = useState('');

  // Estados de feedback da requisição
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    // 2. O objeto formData agora inclui os novos campos
    const formData = {
      nome,
      endereco,
      "funcionario_id:": funcionarioId, // Mantendo a chave com ':' conforme o exemplo
      funil_id: funilId,
      tipo_contato: tipoContato,
      valor_contato: valorContato
      
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

      // Limpar todos os campos
      setNome('');
      setEndereco('');
      setFuncionarioId(1);
      setFunilId(5);
      setTipoContato('email');
      setValorContato('');
      setValorContatoAdd('');

    } catch (error) {
      console.error('Falha ao enviar dados:', error);
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

      const handleSubmitAdd = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      setMessage('');

      const formDataAdd = {
        tipo_contato: tipoContatoAdd,
        valor_contato: valorContatoAdd,
        client_id: ClienteId
      }

      console.log('Enviando os seeguintes dados:', formDataAdd)

      try {
      const response = await fetch('http://localhost:5000/clientes/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAdd),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Resposta do servidor:', result);
      setMessage('Adição realizado com sucesso!');

      setTipoContato('email');
      setValorContato('');
      setValorContatoAdd('');

    } catch (error) {
      console.error('Falha ao enviar dados:', error);
      setMessage(`Erro ao cadastrar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
    }

  
  // 3. Função para lidar com a mudança do tipo de contato e limpar o valor
  const handleTipoContatoChange = (event) => {
    setTipoContato(event.target.value);
    setValorContato(''); // Limpa o campo de valor ao trocar o tipo
  };

  const handleTipoContatoAddChange = (event) => {
    setTipoContatoAdd(event.target.value);
    setValorContatoAdd(''); // Limpa o campo de valor ao trocar o tipo adicional
  };

  return (
    <div className={styles.conteudo}>
      <div className={styles.container}>
        <h1>Cadastro de Clientes</h1>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          {/* Campos existentes */}
          <label htmlFor="nome" className={styles.textLabel}>Nome:</label>
          <input className={styles.input1} type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />

          <label htmlFor="endereco" className={styles.textLabel}>Endereço:</label>
          <input className={styles.input1} type="text" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

          <label htmlFor="funcionario" className={styles.textLabel}>Funcionário Responsável:</label>
          <select className={styles.input1} id="funcionario" name="funcionario" value={funcionarioId} onChange={(e) => setFuncionarioId(Number(e.target.value))}>
            <option value={1}>João Silva</option>
            <option value={2}>Maria Oliveira</option>
            <option value={3}>Pedro Martins</option>
          </select>

          <label htmlFor="funil" className={styles.textLabel}>Funil de Vendas:</label>
          <select className={styles.input1} id="funil" name="funil" value={funilId} onChange={(e) => setFunilId(Number(e.target.value))}>
            <option value={1}>Prospecção</option>
            <option value={2}>Followup</option>
            <option value={3}>Negociação</option>
            <option value={4}>Inicial</option>
            <option value={5}>Potencial</option>
            <option value={6}>Manutencao</option>
            <option value={7}>Nao Venda</option>
            <option value={8}>Venda</option>
          </select>
          
          {/* 4. Novos campos para tipo e valor de contato */}
          <label className={styles.textLabel}>Tipo de Contato:</label>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" value="email" checked={tipoContato === 'email'} onChange={handleTipoContatoChange} />
              E-mail
            </label>
            <label>
              <input type="radio" value="telefone" checked={tipoContato === 'telefone'} onChange={handleTipoContatoChange} />
              Telefone
            </label>
            <label>
              <input type="radio" value="whatsapp" checked={tipoContato === 'whatsapp'} onChange={handleTipoContatoChange} />
              WhatsApp
            </label>
          </div>

          {/* 5. Renderização condicional do campo de valor */}
          {tipoContato && (
            <div>
              <label htmlFor="valor_contato" className={styles.textLabel}>
                {tipoContato.charAt(0).toUpperCase() + tipoContato.slice(1)}:
              </label>
              <input
                className={styles.input1}
                type={tipoContato === 'email' ? 'email' : 'tel'}
                id="valor_contato"
                name="valor_contato"
                value={valorContato}
                onChange={(e) => setValorContato(e.target.value)}
                placeholder={
                  tipoContato === 'email' ? 'exemplo@dominio.com' : '(99) 99999-9999'
                }
                required
              />
            </div>
          )}

          <button type="submit" className={styles.botao} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Formulário'}
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
      <div className={styles.container}>
        <h1> Adicionar Contato </h1>
        <form onSubmit={handleSubmitAdd} className={styles.formulario}>
          <label htmlFor="cliente" className={styles.textLabel}>Cliente:</label>
          <select className={styles.input1} id="cliente" name="cliente" value={ClienteId} onChange={(e) => setClienteId(Number(e.target.value))}>
            <option value={1}>ABC da Embraer</option>
            <option value={2}>Carlinhos Fotoshop</option>
            <option value={3}>Mercearia do Seu Dimas</option>
            <option value={4}>Cleitin do Pneu</option>
          </select>
          <label className={styles.textLabel}>Tipo de Contato:</label>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="email" checked={tipoContatoAdd === 'email'} onChange={handleTipoContatoAddChange} />
            E-mail
          </label>
          <label>
            <input type="radio" value="telefone" checked={tipoContatoAdd === 'telefone'} onChange={handleTipoContatoAddChange} />
            Telefone
          </label>
          <label>
            <input type="radio" value="whatsapp" checked={tipoContatoAdd === 'whatsapp'} onChange={handleTipoContatoAddChange} />
            WhatsApp
          </label>
        </div>
        {tipoContatoAdd && (
            <div>
              <label htmlFor="valor_contato" className={styles.textLabel}>
                {tipoContatoAdd.charAt(0).toUpperCase() + tipoContatoAdd.slice(1)}:
              </label>
              <input
                className={styles.input1}
                type={tipoContatoAdd === 'email' ? 'email' : 'tel'}
                id="valor_contato"
                name="valor_contato"
                value={valorContatoAdd}
                onChange={(e) => setValorContatoAdd(e.target.value)}
                placeholder={
                  tipoContatoAdd === 'email' ? 'exemplo@dominio.com' : '(99) 99999-9999'
                }
                required
              />
            </div>
        )} 
            <button type="submit" className={styles.botao} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Formulário'}
          </button>

          {message && <p>{message}</p>}
        </form>
        
      </div>          
    </div>
  );
}