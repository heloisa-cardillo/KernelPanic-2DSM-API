'use client';
import { useState } from 'react';
import Select from 'react-select';
import styles from './App.module.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const [clienteSelecionado, setclienteSelecionado] = useState(null);

  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigas' },
  ];

  const clients = [
    { id: 1, name: 'Ana Silva', department: 'Vendas', company: 'Tech Solutions', status: 'Ativo', lastInteraction: '2025-09-05', report: 'Discussão sobre a renovação do contrato. Cliente demonstrou interesse em novos produtos.' },
    { id: 2, name: 'Bruno Costa', department: 'Comercial', company: 'Inova Corp', status: 'Pendente', lastInteraction: '2025-09-01', report: 'Apresentação da nova campanha de marketing. Feedback positivo recebido.' },
    { id: 3, name: 'Carla Dias', department: 'Adminstrativo', company: 'BuildMax', status: 'Finalizado', lastInteraction: '2025-09-03', report: 'Projeto concluído e entregue. Cliente satisfeito com o resultado final.' },
    { id: 4, name: 'Daniel Alves', department: 'Vendas', company: 'Future Systems', status: 'Ativo', lastInteraction: '2025-09-04', report: 'Reunião de alinhamento sobre as próximas etapas do projeto. Tudo ocorrendo conforme o planejado.' },
    { id: 5, name: 'Eduarda Lima', department: 'Comercial', company: 'Connect Net', status: 'Pendente', lastInteraction: '2025-09-02', report: 'Cliente reportou um problema técnico. Equipe de suporte já está investigando a solução.' },
  ];

  const DetalhesClick = (client) => {
    setclienteSelecionado(client);
  };

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
      <div className={styles['container-historico']}>
        <div className={styles.tableContainer}>
          <h1 className={styles.titulo}>Histórico de Interações</h1>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar clientes..."
              className={styles.pesquisa}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className ='opções' style={{ marginLeft: '10px' }}>
              <Select
                instanceid="sort-by"
                options = {sortOptions}
                value={sortKey}
                placeholder = 'Data'
                onChange={(selectedOption) => setSortKey(selectedOption.value)}
                styles={{
                  indicatorSeparator: () => ({ display: 'none' })
                }}
              >
              </Select>
            </div>
          </div>

          <div className={styles['conteudo-tabela']}>
            <div className={styles['tabela-container']}>
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>Funcionário</th>
                    <th>Departamento</th>
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
                      <td>{client.department}</td>
                      <td>{client.company}</td>
                      <td>{client.status}</td>
                      <td>{client.lastInteraction}</td>
                      <td>
                        <button className={styles.botao} onClick={() => DetalhesClick(client)}>Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles['detalhes-container']}>
              {clienteSelecionado ? (
                <div>
                  <h3>Detalhes de {clienteSelecionado.company}</h3>
                  <p><strong>Funcionário:</strong> {clienteSelecionado.name}</p>
                  <p><strong>Estado:</strong> {clienteSelecionado.status}</p>
                  <p><strong>Última Interação:</strong> {clienteSelecionado.lastInteraction}</p>
                  <p><strong>Relatório:</strong> {clienteSelecionado.report}</p>
                </div>
              ) : (
                <p>Selecione um cliente na tabela para ver os detalhes.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;