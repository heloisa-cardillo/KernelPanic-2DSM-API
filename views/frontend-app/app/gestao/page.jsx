'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const [clientes, setClients] = useState([]);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/gestao');
      const vendas = response.data;

      const mapaClientes = vendas.map((venda) => {
        const contatos = venda.cliente.contatos?.map(c => `${c.tipo_contato}: ${c.valor_contato}`).join(' | ') || '';
        const primeiroContato = venda.cliente.contatos?.[0] || {};

        return {
          id: venda.cliente.cliente_ID,
          cliente: venda.cliente.nome || '',
          endereco: venda.cliente.endereco || '',
          segmento: venda.cliente.segmentoAtuacao || '',
          status: venda.status || '',
          contatos,
          tipoContato: primeiroContato.tipo_contato || 'telefone',
          contatoValor: primeiroContato.valor_contato || '',
          departamento: venda.funcionario?.nome || '',
          departamentoId: venda.funcionario?.funcionario_ID || null,
          ultimaInteracao: venda.data_venda,
        };
      });

      setClients(mapaClientes);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClients = clientes.filter(client =>
    client.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contatos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClients = [...filteredClients].sort((a, b) => {
    const dateA = new Date(a.ultimaInteracao).getTime();
    const dateB = new Date(b.ultimaInteracao).getTime();
    return sortKey === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleSave = async (e) => {
    e.preventDefault();
      if (!selectedClient.cliente?.trim()) {
      alert('O nome do cliente não pode ficar vazio!');
      return;
    }
    
    const dadosEnvio = {
      cliente: {
        nome: selectedClient.cliente.trim(),
        endereco: selectedClient.endereco?.trim() || '',
        segmentoAtuacao: selectedClient.segmento?.trim() || '', 
        contatos: selectedClient.contatoValor?.trim()
          ? [{ tipo_contato: selectedClient.tipoContato || 'telefone', valor_contato: selectedClient.contatoValor.trim() }]
          : [],
      },
      status: selectedClient.status || '',
      funcionario: {
        nome: selectedClient.departamento || '',
        funcionario_ID: selectedClient.departamentoId || null
      }
    };

    try {
      const response = await axios.put(`http://localhost:5000/gestao/${selectedClient.id}`, dadosEnvio);
      const updated = response.data;

      const updatedClients = clientes.map(c =>
        c.id === selectedClient.id
          ? {
              ...c,
              cliente: updated.cliente.nome,
              endereco: updated.cliente.endereco,
              segmento: updated.cliente.segmentoAtuacao,
              contatos: updated.cliente.contatos?.map(ct => `${ct.tipo_contato}: ${ct.valor_contato}`).join(' | ') || '',
              tipoContato: updated.cliente.contatos?.[0]?.tipo_contato || 'telefone',
              contatoValor: updated.cliente.contatos?.[0]?.valor_contato || '',
              status: updated.status,
              departamento: updated.funcionario?.nome || '',
              departamentoId: updated.funcionario?.funcionario_ID || null,
            }
          : c
      );

      setClients(updatedClients);
      setShowModalUpdate(false);
      alert('Atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Erro ao atualizar cliente!');
    }
  };

  return (
    <div className={styles.conteudo}>
      <div className={styles['container-gestao']}>
        <h1 className={styles.titulo}>Gestão de Clientes</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Pesquisar clientes..."
            className={styles.pesquisa}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className={styles.sortDropdown}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="newest">Mais recentes</option>
            <option value="oldest">Mais antigas</option>
          </select>
        </div>

        <div className={styles['tabela-container']}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Endereço</th>
                <th>Status da venda</th>
                <th>Contatos</th>
                <th>Segmento de atuação</th>
                <th>Departamento responsável</th>
                <th>Última interação</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedClients.map(client => (
                <tr key={client.id}>
                  <td>{client.cliente}</td>
                  <td>{client.endereco}</td>
                  <td>{client.status}</td>
                  <td>{client.contatos}</td>
                  <td>{client.segmento}</td>
                  <td>{client.departamento}</td>
                  <td>{new Date(client.ultimaInteracao).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button className={styles.botao} onClick={() => { setSelectedClient(client); setShowModalUpdate(true); }}>Atualizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModalUpdate && selectedClient && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowModalUpdate(false)}>X</button>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSave}>
              <label>Nome:</label>
                <input type="text" className={styles.inputText} 
                value={selectedClient.cliente}
                onChange={(e) => setSelectedClient({ ...selectedClient, cliente: e.target.value })} 
              /><br /><br />

              <label>Endereço:</label>
                <input type="text" className={styles.inputText} 
                value={selectedClient.endereco} 
                onChange={(e) => setSelectedClient({ ...selectedClient, endereco: e.target.value })} 
              /><br /><br />

              <label>Segmento:</label>
                <input type="text" className={styles.inputText} 
                value={selectedClient.segmento || ''} 
                onChange={(e) => setSelectedClient({ ...selectedClient, segmento: e.target.value })} 
              /><br /><br />

              <label>Status da venda:</label>
                <input type="text" className={styles.inputText} 
                value={selectedClient.status} 
                onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })} 
              /><br /><br />

              <label>Departamento:</label>
              <input type="text" className={styles.inputText}
                value={selectedClient.departamento} 
                onChange={(e) => setSelectedClient({ ...selectedClient, departamento: e.target.value })}
              /><br /><br />

              <label>Contato: </label>
                <select
                  id="contato"
                  className={styles.selectInput}
                  value={selectedClient.tipoContato || 'telefone'}
                  onChange={(e) => setSelectedClient({ ...selectedClient, tipoContato: e.target.value })}
                >
                  <option value="email">E-mail</option>
                  <option value="telefone">Telefone</option>
                  <option value="celular">Celular</option>
                </select>
                <input
                  className={styles.inputText}
                  type="text"
                  value={selectedClient.contatoValor || ''}
                  onChange={(e) => setSelectedClient({ ...selectedClient, contatoValor: e.target.value })}
                /><br /><br />

              <button type="submit" className={styles.botao}>Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
