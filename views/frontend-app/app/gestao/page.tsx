"use client"
import { useState } from 'react';
import './App.css'

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

    if (sortKey === "newest") {
      return dateB - dateA; 
    } else {
      return dateA - dateB; 
    }
  });

  return (
    <div className='conteudo'>
    <div className="container">
      <div className="table-container">
        <h1 className="titulo">Gestão de Clientes</h1>
       
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar clientes..."
            className="pesquisa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <div style={{ marginLeft: '10px' }}>
           <select
        id="sort-by"
        className="sort-dropdown"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="newest">Mais recentes</option>
        <option value="oldest">Mais antigas</option>
      </select>

          </div>
        </div>


        <table className='tabela'>
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
                  <button className="detalhes">Detalhes</button>
                  <button className="atualizar">Atualizar</button>
                  <button className="deletar">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}


export default App;
