'use client';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [clientes, setClients] = useState([]);

    const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/gestao'); 
      const vendas = response.data;

      const mapaClientes = vendas.map((venda) => {
        
        const contatos = venda.cliente.contatos?.map((c) => `${c.tipo_contato}: ${c.valor_contato}`).join(" | ") || "-";

        return {
          id: venda.cliente.cliente_ID,
          cliente: venda.cliente.nome,
          endereco: venda.cliente.endereco,
          status: venda.status,
          contatos: contatos,
          departamento: venda.funcionario.nome,
          ultimaInteracao: venda.data_venda
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
    const dateA = new Date(a.lastInteraction).getTime();
    const dateB = new Date(b.lastInteraction).getTime();
    return sortKey === "newest" ? dateB - dateA : dateA - dateB;
  });

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
                      <td>
                        <button className={styles.botao}>Atualizar</button>
                        <button className={styles.botao}>Deletar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
