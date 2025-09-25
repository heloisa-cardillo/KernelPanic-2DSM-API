'use client';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import axios from 'axios';

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
        const contatos = venda.cliente.contatos?.map((c) => `${c.tipo_contato}: ${c.valor_contato}`).join(" | ") || "";

        return {
          id: venda.cliente.cliente_ID,
          cliente: venda.cliente.nome || "",
          endereco: venda.cliente.endereco || "",
          segmento: venda.cliente.segmento || "",
          status: venda.status || "",
          contatos: contatos,
          departamento: venda.funcionario?.nome || "",
          ultimaInteracao: venda.data_venda,
        };
      });

      setClients(mapaClientes);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  useEffect(() => {
    fetchClientes();}, []);

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
    return sortKey === "newest" ? dateB - dateA : dateA - dateB;
  });

  async function handleSave(e) {
    e.preventDefault();

    if (!selectedClient.cliente?.trim()) {
      alert("O nome do cliente não pode ficar vazio!");
      return;
    }

    const dadosEnvio = {
      cliente: {},
      status: selectedClient.status || "",
      funcionario_ID: selectedClient.departamentoId || null,
    };

    dadosEnvio.cliente.nome = selectedClient.cliente.trim();
    if (selectedClient.endereco?.trim()) dadosEnvio.cliente.endereco = selectedClient.endereco.trim();
    if (selectedClient.segmento?.trim()) dadosEnvio.cliente.segmento = selectedClient.segmento.trim();

    if (selectedClient.contatoValor?.trim()) {
      dadosEnvio.cliente.contatos = [
        { 
          tipo_contato: selectedClient.tipoContato || "telefone", 
          valor_contato: selectedClient.contatoValor.trim() 
        }
      ];
    }
    
    try {
      await axios.put(`http://localhost:5000/gestao/${selectedClient.id}`, dadosEnvio);
      const updatedClients = clientes.map(c =>
        c.id === selectedClient.id ? { ...c, ...selectedClient } : c
      );
      setClients(updatedClients);
      setShowModalUpdate(false);
      alert("Atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar cliente!");
    }
  }


  return (
    <div className={styles['conteudo']}>
      <div className={styles['container-gestao']}>
        <div className={styles.tableContainer}>
          <h1 className={styles.titulo}>Gestão de Clientes</h1>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar clientes..."
              className={styles.pesquisa}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ marginLeft: '10px' }}>
              <select
                id="sort-by"
                className={styles.sortDropdown}
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigas</option>
              </select>
            </div>
          </div>

          <div className={styles['tabela-container']}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Endereço</th>
                  <th>Status da venda</th>
                  <th>Contatos</th>
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
                    <td>{client.departamento}</td>
                    <td>{new Date(client.ultimaInteracao).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button 
                        className={styles.botao} 
                        onClick={() => { setSelectedClient(client); setShowModalUpdate(true); }}
                      >
                        Atualizar
                      </button>
                      <button className={styles.botao}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
        {showModalUpdate && selectedClient && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={() => setShowModalUpdate(false)}>X</button>
              <h2>Editar Cliente</h2>
              <form onSubmit={handleSave}>

                <label>Nome: </label>
                <input
                  className={styles.inputText}
                  type="text"
                  value={selectedClient.cliente || ''}
                  onChange={(e) => setSelectedClient({ ...selectedClient, cliente: e.target.value })}
                /><br /><br />

                <label>Endereço: </label>
                <input
                  className={styles.inputText}
                  type="text"
                  value={selectedClient.endereco || ''}
                  onChange={(e) => setSelectedClient({ ...selectedClient, endereco: e.target.value })}
                /><br /><br />

                <label>Status da venda: </label>
                <input
                  className={styles.inputText}
                  type="text"
                  value={selectedClient.status || ''}
                  onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}
                /><br /><br />

                <label>Departamento: </label>
                <input
                  className={styles.inputText}
                  type="text"
                  value={selectedClient.departamento || ''}
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

                <button className={styles.botao} type="submit">Salvar</button>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
