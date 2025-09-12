'use client';
import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');

  const clients = [
    { id: 1, name: 'Emra', company: 'WCM', status: 'Pendente', lastInteraction: '2025-09-05' },
    { id: 2, name: 'Emra', company: 'WCM', status: 'Pendente', lastInteraction: '2025-09-01' },
    { id: 3, name: 'Emra', company: 'WCM', status: 'Pendente', lastInteraction: '2025-09-03' },
    { id: 4, name: 'Emra', company: 'WCM', status: 'Pendente', lastInteraction: '2025-09-04' },
    { id: 5, name: 'Emra', company: 'WCM', status: 'Pendente', lastInteraction: '2025-09-02' },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.status.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <th></th>
                    <th>Cliente</th>
                    <th>Estado da venda</th>
                    <th>Última Interação</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedClients.map(client => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.company}</td>
                      <td>{client.status}</td>
                      <td>{client.lastInteraction}</td>
                      <td>
                        <button className={styles.botao}>Detalhes</button>
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
